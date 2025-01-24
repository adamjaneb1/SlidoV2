<template>
  <div class="canvas-tool bg-gray-50">
    <div class="left-handler mt-1">
        <IconBack class="handler-item  hover:scale-110" :class="{ 'disable': !canUndo }" v-tooltip="'Undo (Ctrl + Z)'" @click="undo()" />
      <IconNext class="handler-item hover:scale-110" :class="{ 'disable': !canRedo }" v-tooltip="'Redo (Ctrl + Y)'" @click="redo()" /> 
    </div>

    <div class="add-element-handler">
      <Popover trigger="click" v-model:value="textTypeSelectVisible" :offset="10">
        <template #content>
            <PopoverMenuItem center @click="() => { drawText(); textTypeSelectVisible = false }"><IconTextRotationNone /> Horizontal Text Box</PopoverMenuItem>
            <PopoverMenuItem center @click="() => { drawText(true); textTypeSelectVisible = false }"><IconTextRotationDown /> Vertical Text Box</PopoverMenuItem>
          </template>
        <IconFontSize class="handler-item " :class="{ 'active': creatingElement?.type === 'text' }" v-tooltip="'Insert Text'" />
      </Popover>

        <Popover trigger="click" style="height: 100%;" v-model:value="shapePoolVisible" :offset="10">
          <template #content>
            <ShapePool @select="shape => drawShape(shape)" />
          </template>
          <IconGraphicDesign class="handler-item" :class="{ 'active': creatingCustomShape || creatingElement?.type === 'shape' }" v-tooltip="'Insert Shape'" />
        </Popover>
        
        <Popover trigger="click" v-model:value="shapeMenuVisible" style="height: 100%;" :offset="10">
          <template #content>
            <PopoverMenuItem center @click="() => { drawCustomShape(); shapeMenuVisible = false }">Freeform Drawing</PopoverMenuItem>
          </template>
          <IconEdit class="handler-item" :class="{ 'active': creatingCustomShape || creatingElement?.type === 'shape' }" v-tooltip="'Draw Shape'" />
        </Popover>

      <FileInput @change="files => insertImageElement(files)">
        <IconPicture class="handler-item" v-tooltip="'Insert Image'" />
      </FileInput>
      <Popover trigger="click" v-model:value="linePoolVisible" :offset="10">
        <template #content>
          <LinePool @select="line => drawLine(line)" />
        </template>
        <IconConnection class="handler-item" :class="{ 'active': creatingElement?.type === 'line' }" v-tooltip="'Insert Line'" />
      </Popover>
      <Popover trigger="click" v-model:value="chartPoolVisible" :offset="10">
        <template #content>
          <ChartPool @select="chart => { createChartElement(chart); chartPoolVisible = false }" />
        </template>
        <IconChartProportion class="handler-item" v-tooltip="'Insert Chart'" />
      </Popover>
      <Popover trigger="click" v-model:value="tableGeneratorVisible" :offset="10">
        <template #content>
          <TableGenerator
            @close="tableGeneratorVisible = false"
            @insert="({ row, col }) => { createTableElement(row, col); tableGeneratorVisible = false }"
          />
        </template>
        <IconInsertTable class="handler-item" v-tooltip="'Insert Table'" />
      </Popover>
      <IconFormula class="handler-item" v-tooltip="'Insert Formula'" @click="latexEditorVisible = true" />

    </div>

    <div class="right-handler">
     
    </div>

    <Modal
      v-model:visible="latexEditorVisible" 
      :width="880"
    >
      <LaTeXEditor 
        @close="latexEditorVisible = false"
        @update="data => { createLatexElement(data); latexEditorVisible = false }"
      />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore, useSnapshotStore, useSlidesStore } from '@/store'
import { getImageDataURL } from '@/utils/image'
import type { ShapePoolItem } from '@/configs/shapes'
import type { LinePoolItem } from '@/configs/lines'
import useHistorySnapshot from '@/hooks/useHistorySnapshot'
import useCreateElement from '@/hooks/useCreateElement'


import ShapePool from './ShapePool.vue'
import LinePool from './LinePool.vue'
import ChartPool from './ChartPool.vue'
import TableGenerator from './TableGenerator.vue'
import MediaInput from './MediaInput.vue'
import LaTeXEditor from '@/components/LaTeXEditor/index.vue'
import FileInput from '@/components/FileInput.vue'
import Modal from '@/components/Modal.vue'
import Divider from '@/components/Divider.vue'
import Popover from '@/components/Popover.vue'
import PopoverMenuItem from '@/components/PopoverMenuItem.vue'
import Input from '@/components/Input.vue'

const mainStore = useMainStore()
const slidesStore = useSlidesStore()
const { title } = storeToRefs(slidesStore)
const { creatingElement, creatingCustomShape, showSelectPanel, showSearchPanel, showNotesPanel } = storeToRefs(mainStore)
const { canUndo, canRedo } = storeToRefs(useSnapshotStore())

const { redo, undo } = useHistorySnapshot()

const startEditTitle = () => {
  titleValue.value = title.value
  editingTitle.value = true
  nextTick(() => titleInputRef.value?.focus())
}

const handleUpdateTitle = () => {
  slidesStore.setTitle(titleValue.value)
  editingTitle.value = false
}

const cancelEditTitle = () => {
  titleValue.value = title.value
  editingTitle.value = false
}

const editingTitle = ref(false)
const titleInputRef = ref<InstanceType<typeof Input>>()
const titleValue = ref('')

const {
  createImageElement,
  createChartElement,
  createTableElement,
  createLatexElement,
  createVideoElement,
  createAudioElement,
} = useCreateElement()

const insertImageElement = (files: FileList) => {
  const imageFile = files[0]
  if (!imageFile) return
  getImageDataURL(imageFile).then(dataURL => createImageElement(dataURL))
}

const shapePoolVisible = ref(false)
const linePoolVisible = ref(false)
const chartPoolVisible = ref(false)
const tableGeneratorVisible = ref(false)
const mediaInputVisible = ref(false)
const latexEditorVisible = ref(false)
const textTypeSelectVisible = ref(false)
const shapeMenuVisible = ref(false)
const moreVisible = ref(false)

// Draw text area
const drawText = (vertical = false) => {
  mainStore.setCreatingElement({
    type: 'text',
    vertical,
  })
}

// Draw shape area
const drawShape = (shape: ShapePoolItem) => {
  mainStore.setCreatingElement({
    type: 'shape',
    data: shape,
  })
  shapePoolVisible.value = false
}
// Draw custom polygon
const drawCustomShape = () => {
  mainStore.setCreatingCustomShapeState(true)
  shapePoolVisible.value = false
}

// Draw line path
const drawLine = (line: LinePoolItem) => {
  mainStore.setCreatingElement({
    type: 'line',
    data: line,
  })
  linePoolVisible.value = false
}

// Open selection panel
const toggleSelectPanel = () => {
  mainStore.setSelectPanelState(!showSelectPanel.value)
}

// Open find & replace panel
const toggleSraechPanel = () => {
  mainStore.setSearchPanelState(!showSearchPanel.value)
}

// Open notes panel
const toggleNotesPanel = () => {
  mainStore.setNotesPanelState(!showNotesPanel.value)
}
</script>

<style lang="scss" scoped>
.canvas-tool {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 13px;
  user-select: none;
}
.left-handler, .more {
  display: flex;
  align-items: center;
}
.more-icon {
  display: none;
}
.add-element-handler {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;

  .handler-item {
    width: 32px;

    &:not(.group-btn):hover {
      background-color: #f1f1f1;
    }

    &.active {
      color: $themeColor;
    }

    &.group-btn {
      width: auto;
      margin-right: 5px;

      &:hover {
        background-color: #f3f3f3;
      }

      .icon, .arrow {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .icon {
        width: 26px;
        padding: 0 2px;

        &:hover {
          background-color: #e9e9e9;
        }
        &.active {
          color: $themeColor;
        }
      }
      .arrow {
        font-size: 12px;

        &:hover {
          background-color: #e9e9e9;
        }
      }
    }
  }
}
.handler-item {
  height: 30px;
  font-size: 14px;
  margin: 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $borderRadius;
  overflow: hidden;
  cursor: pointer;

  &.disable {
    opacity: .5;
  }
}
.left-handler, .right-handler {
  .handler-item {
    padding: 0 8px;

    &.active,
    &:not(.disable):hover {
      background-color: #f1f1f1;
    }
  }
}
.right-handler {
  display: flex;
  align-items: center;

  .text {
    display: inline-block;
    width: 40px;
    text-align: center;
    cursor: pointer;
  }

  .viewport-size {
    font-size: 13px;
  }
}

@media screen and (width <= 1200px) {
  .right-handler .text {
    display: none;
  }
  .more > .handler-item {
    display: none;
  }
  .more-icon {
    display: block;
  }
}
@media screen and (width <= 1000px) {
  .left-handler, .right-handler {
    display: none;
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

</style>
