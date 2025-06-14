<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useStore } from 'vuex'
import HorseContainer from './components/HorseContainer.vue'
import type { Horse } from './models/horse'

// Setup Vuex
const store = useStore()
const round = computed(() => store.state.round)
const increment = () => store.dispatch('increment')
const reset = () => store.dispatch('reset')

// Window width tracking
const windowWidth = ref(window.innerWidth)
const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})

// Race finish callback
const onFinish = (horses: Horse[]) => {
  if (round.value < 5) {
    horses.forEach((horse) => {
      horse.position = 0
      horse.speed = Math.random() * 20 + 10
    })
    increment()
  } else {
    reset()
  }
}
</script>

<template>
  <header></header>

  <main>
    <div class="area">
      <!-- Horses -->
      <HorseContainer :key="round" :onFinish="onFinish" />
      <!-- Finish line -->
      <div
        class="finish-line"
        :style="{
          position: 'fixed',
          top: '0',
          left: windowWidth * 0.67 + 'px',
          width: 1 - round * 0.1 + 'vw',
        }"
      ></div>
    </div>
  </main>
</template>

<style scoped>
.area {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: green;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.finish-line {
  height: 100vh;
  background-color: white;
}
</style>
