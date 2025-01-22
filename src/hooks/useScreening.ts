import { useScreenStore, useSlidesStore } from '@/store'
import { enterFullscreen, exitFullscreen, isFullscreen } from '@/utils/fullscreen'

export default () => {
  const screenStore = useScreenStore()
  const slidesStore = useSlidesStore()

  // Enter presentation mode (starting from current slide)
  const enterScreening = () => {
    enterFullscreen()
    screenStore.setScreening(true)
  }

  // Enter presentation mode (starting from first slide)
  const enterScreeningFromStart = () => {
    slidesStore.updateSlideIndex(0)
    enterScreening()
  }

  // Exit presentation mode
  const exitScreening = () => {
    screenStore.setScreening(false)
    if (isFullscreen()) exitFullscreen()
  }

  return {
    enterScreening,
    enterScreeningFromStart,
    exitScreening,
  }
}
