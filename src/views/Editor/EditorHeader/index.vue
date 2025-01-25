<template>
  <div class="editor-header">
    <div class="left">
      <div class="font-bold ml-2">Slido.ai</div>
      <div 
        class="text-sm py-1 ml-3 px-2 cursor-pointer"
        :class="[activeView === 'home' ? 'active-nav-item' : 'text-gray-500 hover:bg-gray-100']"
        @click="setActiveView('home')"
      >Home</div>
      <div 
        class="text-sm py-1 ml-2 px-2 cursor-pointer"
        :class="[activeView === 'editor' ? 'active-nav-item' : 'text-gray-500 hover:bg-gray-100']"
        @click="setActiveView('editor')"
      >Editor</div>
      <div 
        class="text-sm py-1 ml-2 px-2 cursor-pointer"
        :class="[activeView === 'library' ? 'active-nav-item' : 'text-gray-500 hover:bg-gray-100']"
        @click="setActiveView('library')"
      >Library</div>
      <div 
        class="text-sm py-1 ml-2 px-2 cursor-pointer"
        :class="[activeView === 'explore' ? 'active-nav-item' : 'text-gray-500 hover:bg-gray-100']"
        @click="setActiveView('explore')"
      >Explore</div>
    </div>

    <div class="right">
     
      <div class="menu-item" v-tooltip="'AI Generate PPT'" @click="openAIPPTDialog(); mainMenuVisible = false">
        <span class="text">AI</span>
      </div>

    </div>

    <Drawer
      :width="320"
      v-model:visible="hotkeyDrawerVisible"
      placement="right"
    >
      <HotkeyDoc />
      <template v-slot:title>Shortcuts</template>
    </Drawer>

    <FullscreenSpin :loading="exporting" tip="Importing..." />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMainStore, useSlidesStore } from '@/store'
import useScreening from '@/hooks/useScreening'
import useImport from '@/hooks/useImport'
import useSlideHandler from '@/hooks/useSlideHandler'
import HotkeyDoc from './HotkeyDoc.vue'
import type { DialogForExportTypes } from '@/types/export'
import FileInput from '@/components/FileInput.vue'
import FullscreenSpin from '@/components/FullscreenSpin.vue'
import Drawer from '@/components/Drawer.vue'
import type Input from '@/components/Input.vue'
import Popover from '@/components/Popover.vue'
import PopoverMenuItem from '@/components/PopoverMenuItem.vue'

const mainStore = useMainStore()
const slidesStore = useSlidesStore()
const { title } = storeToRefs(slidesStore)
const { enterScreening, enterScreeningFromStart } = useScreening()
const { importSpecificFile, importPPTXFile, exporting } = useImport()
const { resetSlides } = useSlideHandler()

const router = useRouter()
const activeView = ref(router.currentRoute.value.name as string)
const mainMenuVisible = ref(false)

// Watch for route changes
watch(() => router.currentRoute.value.name, (newRoute) => {
  if (newRoute) {
    activeView.value = newRoute as string
  }
})

const setActiveView = (view: string) => {
  activeView.value = view
  if (view === 'home') {
    router.push('/')
  } 
  else if (view === 'editor') {
    router.push('/editor')
  } 
  else if (view === 'library') {
    router.push('/library')
  } 
  else if (view === 'explore') {
    router.push('/explore')
  }
}

const hotkeyDrawerVisible = ref(false)
const editingTitle = ref(false)
const titleInputRef = ref<InstanceType<typeof Input>>()
const titleValue = ref('')

const startEditTitle = () => {
  titleValue.value = title.value
  editingTitle.value = true
  nextTick(() => titleInputRef.value?.focus())
}

const handleUpdateTitle = () => {
  slidesStore.setTitle(titleValue.value)
  editingTitle.value = false
}


const setDialogForExport = (type: DialogForExportTypes) => {
  mainStore.setDialogForExport(type)
  mainMenuVisible.value = false
}

const openMarkupPanel = () => {
  mainStore.setMarkupPanelState(true)
}

const openAIPPTDialog = () => {
  mainStore.setAIPPTDialogState(true)
}
</script>

<style lang="scss" scoped>
.editor-header {
  background-color: #fff;
  user-select: none;
  border-bottom: 1px solid $borderColor;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}
.left, .right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-item {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 0 10px;
  border-radius: $borderRadius;
  cursor: pointer;

  .icon {
    font-size: 18px;
    color: #666;
  }
  .text {
    width: 18px;
    text-align: center;
    font-size: 16px;
  }

  &:hover {
    background-color: #f1f1f1;
  }
}
.group-menu-item {
  height: 30px;
  display: flex;
  margin: 0 8px;
  padding: 0 2px;
  border-radius: $borderRadius;

  &:hover {
    background-color: #f1f1f1;
  }

  .menu-item {
    padding: 0 3px;
  }
  .arrow-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
.title {
  height: 30px;
  margin-left: 2px;
  font-size: 13px;

  .title-input {
    width: 200px;
    height: 100%;
    padding-left: 0;
    padding-right: 0;

    ::v-deep(input) {
      height: 28px;
      line-height: 28px;
    }
  }
  .title-text {
    min-width: 20px;
    max-width: 400px;
    line-height: 30px;
    padding: 0 6px;
    border-radius: $borderRadius;
    cursor: pointer;

    @include ellipsis-oneline();

    &:hover {
      background-color: #f1f1f1;
    }
  }
}
.github-link {
  display: inline-block;
  height: 30px;
}

.active-nav-item {
  color: $themeColor;
  background-color: rgba($themeColor, 0.1);
}
</style>
