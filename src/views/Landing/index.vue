<template>
  <div class="bg-gray-100 overflow-scroll">
    <div class="flex flex-col items-center justify-center p-8">
      <!-- Slide Container -->
      <div class="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden flex" style="aspect-ratio: 16/9;">
      <!-- Left Column - Text Input -->
      <div class="flex-1 p-8 flex flex-col">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Type a prompt to create your first Slido</h1>
        <div class="absolute mt-16 -ml-14">
          <button :class="!promptText?'motion-translate-y-out-100 motion-opacity-out-0 motion-scale-out-[0] motion-blur-out-sm':'motion-preset-confetti'" class="shadow-md w-12 h-12 rounded-full text-white flex items-center justify-center bg-[#8f84bc] hover:bg-[#50457d] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>
        <div class="relative w-full">
          <div class="p-5">
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
        <div class="mt-4">
          <h3 class="text-lg font-medium text-gray-700 mb-2">Examples</h3>
          <div class="space-y-1">
            <div 
              v-for="(suggestion, index) in suggestions" 
              :key="index"
              class="cursor-pointer hover:text-gray-600 transition-colors"
              @click="selectPrompt(suggestion)"
            >
              <p class="text-sm px-2 py-1">• {{ suggestion }}</p>
            </div>
          </div>
        </div>
        <div class="flex gap-4 mt-5">
          <Button 
            type="ghost"
            class="text-gray-500 hover:text-gray-400 rounded-lg"
          >
            Or start a blank project
          </Button>
        </div>
      </div>

      <!-- Right Column - Image -->
      <div class="w-[40%] p-8 flex items-center justify-center">
        <div>
          <img 
            src="/src/assets/images/Slido.png"
            alt="BotSlides" 
            class="w-full h-full object-contain motion-scale-in-[0.5] motion-translate-x-in-[-120%] motion-translate-y-in-[-60%] motion-opacity-in-[33%] motion-rotate-in-[-1080deg] motion-blur-in-[10px] motion-delay-[0.38s]/scale motion-duration-[0.38s]/opacity motion-duration-[1.20s]/rotate motion-duration-[0.15s]/blur motion-delay-[0.60s]/blur motion-ease-spring-bouncier"
          />
          <h1 class="text-8xl text-center font-bold w-full motion-opacity-in-[0%] motion-duration-[1.50s] motion-duration-[0.42s]/opacity motion-delay-[0.5s]/opacity">Slido.ai</h1>
        </div>
      </div>
      </div>
    </div>
    <!-- Page 2: Introduction -->
    <div class="flex items-center justify-center min-h-screen p-8 bg-gradient-to-b from-gray-100 to-white">
      <div class="w-full max-w-6xl bg-white rounded-lg shadow-xl p-12">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1 space-y-6">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">
              <span class="text-[#8f84bc]">Transform</span> Your Ideas into Visual Stories
            </h2>
            <p class="text-xl text-gray-600 leading-relaxed">
              Slido.ao is an innovative AI-powered platform that turns your text prompts into stunning illustrations and professional slides. Whether you're creating presentations, educational content, or business proposals, Slido.ao helps you communicate your ideas visually.
            </p>
            <div class="flex items-center space-x-4 mt-8">
              <div class="flex items-center space-x-2">
                <svg class="w-6 h-6 text-[#8f84bc]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                </svg>
                <span class="text-gray-700">AI-Powered</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-6 h-6 text-[#8f84bc]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
                <span class="text-gray-700">Easy to Use</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-6 h-6 text-[#8f84bc]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                </svg>
                <span class="text-gray-700">Professional</span>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <img 
              src="/src/assets/images/Slido.png" 
              alt="Slido.ao Interface" 
              class="w-full h-auto rounded-lg shadow-lg motion-safe:animate-float"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Page 3: Key Features -->
    <div class="flex items-center justify-center min-h-screen p-8 bg-white">
      <div class="w-full max-w-6xl bg-white rounded-lg shadow-xl p-12">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">
          Powerful <span class="text-[#8f84bc]">Features</span> at Your Fingertips
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div class="w-12 h-12 bg-[#8f84bc] rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Smart Prompts</h3>
            <p class="text-gray-600">Transform your text descriptions into visually stunning slides with our advanced AI technology.</p>
          </div>

          <!-- Feature 2 -->
          <div class="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div class="w-12 h-12 bg-[#8f84bc] rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Templates Gallery</h3>
            <p class="text-gray-600">Access a wide range of professional templates to kickstart your presentations.</p>
          </div>

          <!-- Feature 3 -->
          <div class="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div class="w-12 h-12 bg-[#8f84bc] rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Manual Editing</h3>
            <p class="text-gray-600">Fine-tune your slides with our intuitive editing tools for shapes, text, and drawings.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Page 4: Use Cases -->
    <div class="flex items-center justify-center min-h-screen p-8 bg-gradient-to-b from-white to-gray-100">
      <div class="w-full max-w-6xl bg-white rounded-lg shadow-xl p-12">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">
          Perfect for Every <span class="text-[#8f84bc]">Presentation</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Use Case 1 -->
          <div class="flex items-start space-x-4">
            <div class="w-8 h-8 bg-[#8f84bc] rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Business Presentations</h3>
              <p class="text-gray-600">Create professional pitch decks, reports, and business proposals that stand out.</p>
            </div>
          </div>

          <!-- Use Case 2 -->
          <div class="flex items-start space-x-4">
            <div class="w-8 h-8 bg-[#8f84bc] rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Education</h3>
              <p class="text-gray-600">Design engaging educational content and learning materials with ease.</p>
            </div>
          </div>

          <!-- Use Case 3 -->
          <div class="flex items-start space-x-4">
            <div class="w-8 h-8 bg-[#8f84bc] rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Creative Projects</h3>
              <p class="text-gray-600">Bring your creative ideas to life with custom illustrations and designs.</p>
            </div>
          </div>

          <!-- Use Case 4 -->
          <div class="flex items-start space-x-4">
            <div class="w-8 h-8 bg-[#8f84bc] rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Event Planning</h3>
              <p class="text-gray-600">Design attractive event materials and presentations for any occasion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Page 5: Call to Action -->
    <div class="flex items-center justify-center min-h-screen p-8 bg-gradient-to-b from-gray-100 to-white">
      <div class="w-full max-w-6xl bg-white rounded-lg shadow-xl p-12 text-center">
        <h2 class="text-4xl font-bold text-gray-800 mb-6">
          Ready to <span class="text-[#8f84bc]">Transform</span> Your Presentations?
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already creating stunning presentations with Slido.ao. Start your journey today!
        </p>
        <div class="flex flex-col md:flex-row items-center justify-center gap-4">
          <button class="px-8 py-4 bg-[#8f84bc] hover:bg-[#b3accf] text-white rounded-lg font-semibold transition-colors duration-300">
            Get Started for Free
          </button>
          <button class="px-8 py-4 border-2 border-[#8f84bc] text-[#8f84bc] hover:bg-gray-50 rounded-lg font-semibold transition-colors duration-300">
            Watch Demo
          </button>
        </div>
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center">
            <div class="text-4xl font-bold text-[#8f84bc] mb-2">100+</div>
            <div class="text-gray-600">Templates</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-4xl font-bold text-[#8f84bc] mb-2">10k+</div>
            <div class="text-gray-600">Active Users</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-4xl font-bold text-[#8f84bc] mb-2">24/7</div>
            <div class="text-gray-600">Support</div>
          </div>
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
.motion-safe\:animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Smooth transitions */
.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Hover effects */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Responsive design */
@media (max-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .md\:flex-row {
    flex-direction: column;
  }
}
</style>
