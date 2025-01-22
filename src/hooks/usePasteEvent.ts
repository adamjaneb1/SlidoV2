import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'
import { getImageDataURL } from '@/utils/image'
import usePasteTextClipboardData from './usePasteTextClipboardData'
import useCreateElement from './useCreateElement'

export default () => {
  const { editorAreaFocus, thumbnailsFocus, disableHotkeys } = storeToRefs(useMainStore())

  const { pasteTextClipboardData } = usePasteTextClipboardData()
  const { createImageElement } = useCreateElement()

  // Paste image to slide element
  const pasteImageFile = (imageFile: File) => {
    getImageDataURL(imageFile).then(dataURL => createImageElement(dataURL))
  }

  /**
   * Paste event listener
   * @param e ClipboardEvent
   */
  const pasteListener = (e: ClipboardEvent) => {
    if (!editorAreaFocus.value && !thumbnailsFocus.value) return
    if (disableHotkeys.value) return

    if (!e.clipboardData) return

    const clipboardDataItems = e.clipboardData.items
    const clipboardDataFirstItem = clipboardDataItems[0]

    if (!clipboardDataFirstItem) return

    // If clipboard contains image, try to read image first
    for (const item of clipboardDataItems) {
      if (item.kind === 'file' && item.type.indexOf('image') !== -1) {
        const imageFile = item.getAsFile()
        if (imageFile) pasteImageFile(imageFile)
        return
      }
    }
    
    // If clipboard doesn't contain image but has text content, try to parse text content
    if (clipboardDataFirstItem.kind === 'string' && clipboardDataFirstItem.type === 'text/plain') {
      clipboardDataFirstItem.getAsString(text => pasteTextClipboardData(text))
    }
  }

  onMounted(() => {
    document.addEventListener('paste', pasteListener)
  })
  onUnmounted(() => {
    document.removeEventListener('paste', pasteListener)
  })
}
