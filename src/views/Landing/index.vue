<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-8">
    <!-- Slide Container -->
    <div class="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden flex" style="aspect-ratio: 16/9;">
      <!-- Left Column - Text Input -->
      <div class="flex-1 p-8 flex flex-col">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 ">Type a prompt to create your first Slido</h1>
        <div class="absolute mt-16 -ml-14">

<button :class="!promptText?'motion-translate-y-out-100 motion-opacity-out-0 motion-scale-out-[0] motion-blur-out-sm':'motion-preset-confetti'" class=" shadow-md w-12 h-12 rounded-full text-white flex items-center justify-center bg-[#8f84bc] hover:bg-[#50457d] transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
</button>
</div>
        <div class="relative w-full">
          <div class=" p-5">
<div v-if="!promptText" class="absolute left-5 text-gray-300 motion-preset-typewriter-[30] motion-duration-[8000ms] text-2xl">Create a presentation about...</div>
            <textarea
            v-model="promptText"
            ref="textareaRef"
            autofocus
            :class="['w-full h-full resize-none text-2xl focus:border-blue-500 focus:ring-2 outline-none', !promptText && 'caret-transparent']"
            style="min-height: 300px;"
          ></textarea>
        </div>

         
        </div>
Examples
        <div class="">
          <div 
            v-for="(suggestion, index) in suggestions" 
            :key="index"
            class=" cursor-pointer hover:text-gray-200"
            @click="selectPrompt(suggestion)"
          >
            <p class="text-sm  px-2 py-1">• {{ suggestion }}</p>
          </div>
        </div>

        <div class="flex gap-4 mt-5">
          <Button 
            type="ghost"
            class="text-gray-500 hover:text-gray-400  rounded-lg"
          >
            Or start a blank project
          </Button>
        </div>
      </div>

      <!-- Right Column - Image -->
      <div class="w-[40%] p-8 flex items-center justify-center">
        <div >
          <img 
            src="@/assets/images/Slido.png"
            alt="BotSlides" 
            class="w-full h-full object-contain motion-scale-in-[0.5] motion-translate-x-in-[-120%] motion-translate-y-in-[-60%] motion-opacity-in-[33%] motion-rotate-in-[-1080deg] motion-blur-in-[10px] motion-delay-[0.38s]/scale motion-duration-[0.38s]/opacity motion-duration-[1.20s]/rotate motion-duration-[0.15s]/blur motion-delay-[0.60s]/blur motion-ease-spring-bouncier"
          />
          <h1 class="text-8xl text-center font-bold w-full motion-opacity-in-[0%] motion-duration-[1.50s] motion-duration-[0.42s]/opacity motion-delay-[0.5s]/opacity">Slido</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import { ref } from 'vue'

const promptText = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const suggestions = [
  'Create a presentation about AI trends in 2024',
  'Explain quantum computing in simple terms',
  'Showcase our company\'s new product features',
  'Present a marketing strategy for Q4'
]

declare global {
  interface Window {
    selectPromptInterval?: number
  }
}

const selectPrompt = (text: string) => {
  let currentPos = 0
  const typingSpeed = 10 // milliseconds per character

  // Clear any existing animation
  if (window.selectPromptInterval) {
    clearInterval(window.selectPromptInterval)
  }

  promptText.value = '' // Reset text before starting animation

  window.selectPromptInterval = setInterval(() => {
    if (currentPos < text.length) {
      promptText.value += text[currentPos]
      currentPos++
    } 
    else {
      clearInterval(window.selectPromptInterval)
      window.selectPromptInterval = undefined
      textareaRef.value?.focus()
    }
  }, typingSpeed)
}
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
