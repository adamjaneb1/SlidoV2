<template>
  <div class="canvas-tool">
    <div class="left-handler">
      <div class="title">
        <Input 
          class="title-input" 
          ref="titleInputRef"
          v-model:value="titleValue" 
          @blur="handleUpdateTitle()" 
          @keydown.enter="handleUpdateTitle()"
          @keydown.esc="cancelEditTitle()"
          v-if="editingTitle" 
        ></Input>
        <div 
          class="title-text"
          @click="startEditTitle()"
          :title="title"
          v-else
        >{{ title }}</div>
      </div>
    </div>

    <div class="add-element-handler">
    
    </div>

    <div class="right-handler">
      <div class="more">
        <Popover class="more-icon" trigger="click" v-model:value="moreVisible" :offset="10">
          <template #content>
            <PopoverMenuItem center @click="toggleNotesPanel(); moreVisible = false">Notes Panel</PopoverMenuItem>
            <PopoverMenuItem center @click="toggleSelectPanel(); moreVisible = false">Selection Pane</PopoverMenuItem>
            <PopoverMenuItem center @click="toggleSraechPanel(); moreVisible = false">Find & Replace</PopoverMenuItem>
          </template>
          <IconMore class="handler-item" />
        </Popover>
        <IconComment class="handler-item" :class="{ 'active': showNotesPanel }" v-tooltip="'Notes Panel'" @click="toggleNotesPanel()" />
        <IconMoveOne class="handler-item" :class="{ 'active': showSelectPanel }" v-tooltip="'Selection Pane'" @click="toggleSelectPanel()" />
        <IconSearch class="handler-item" :class="{ 'active': showSearchPanel }" v-tooltip="'Find/Replace (Ctrl + F)'" @click="toggleSraechPanel()" />
        <IconDownload class="handler-item" :class="{ 'active': showSearchPanel }" v-tooltip="'Export'" @click="toggleSraechPanel()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore, useSlidesStore } from '@/store'

import Popover from '@/components/Popover.vue'
import PopoverMenuItem from '@/components/PopoverMenuItem.vue'
import Input from '@/components/Input.vue'

const mainStore = useMainStore()
const slidesStore = useSlidesStore()
const { title } = storeToRefs(slidesStore)
const { showSelectPanel, showSearchPanel, showNotesPanel } = storeToRefs(mainStore)

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


const moreVisible = ref(false)


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
  border-bottom: 1px solid $borderColor;
  background-color: #fff;
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
