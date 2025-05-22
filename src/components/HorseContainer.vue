<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'
import { horseColors } from '../constants/horseConstants'
import { shuffleArray } from '../helpers/utils'
import type { Horse } from '../models/horse'
import { useStore } from 'vuex'
// Props
const props = defineProps<{
  onFinish: (horse: Horse[]) => void
}>()

// State
const finishedHorses = ref<Horse[]>([])
const tenHorses = ref<Horse[]>([])

const store = useStore()
const round = computed(() => store.state.round)
let intervalId: number | undefined

// Initialize 20 shuffled horses and select 10
function initializeHorses(): Horse[] {
  const indices = shuffleArray(Array.from({ length: 20 }, (_, i) => i))
  return indices.map((index) => ({
    id: index,
    position: 0,
    color: horseColors[index],
    speed: Math.random() * 20 + 10,
  }))
}

// Move horses each tick
function moveHorses() {
  let allFinished = true

  for (const horse of tenHorses.value) {
    if (horse.speed === 0) continue

    horse.position += horse.speed
    const finishLine = window.innerWidth * 0.65

    if (horse.position >= finishLine) {
      horse.position = finishLine
      horse.speed = 0
      finishedHorses.value.push(horse)
    } else {
      allFinished = false
    }
  }

  if (allFinished) {
    clearInterval(intervalId)
    setTimeout(() => {
      props.onFinish(tenHorses.value)
    }, 2000)
  }
}

// Start race
function startRace() {
  const horses = initializeHorses()
  tenHorses.value = shuffleArray(horses).slice(0, 10)
  intervalId = window.setInterval(moveHorses, 100)
}

onMounted(() => {
  startRace()
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="horse-container">
    <!-- Horse animation -->
    <div
      v-for="horse in tenHorses"
      :key="horse.id"
      class="gif-wrapper"
      :style="{ transform: `translateX(${horse.position}px)` }"
    >
      <!-- Decreasing horse size to give long area effect -->
      <img
        src="../assets/horse.gif"
        alt="Horse"
        :width="80 - round * 10"
        :height="80 - round * 10"
      />
      <div
        :style="{
          backgroundColor: horse.color,
          position: 'absolute',
          top: 30 + 'px',
          left: 30 + 'px',
          width: 20 - round * 2 + 'px',
          height: 20 - round * 2 + 'px',
          borderRadius: '50%',
        }"
      ></div>
    </div>

    <!-- Leaderboard -->
    <div class="leaderboard">
      <h3>Leaderboard</h3>
      <h3>Round: {{ round + 1 }} - {{ 1200 + round * 200 }} meters</h3>
      <ul>
        <li v-for="(horse, index) in finishedHorses" :key="horse.id">
          <span class="color-dot" :style="{ backgroundColor: horse.color }"></span>
          {{ index + 1 }}. Horse #{{ horse.id }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.horse-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
  background-color: green;
}

.gif-wrapper {
  position: relative;
  display: inline-block;
  transition: transform 0.1s linear;
  margin-bottom: 5px;
  will-change: transform;
}

.leaderboard {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  width: 250px;
  color: black;
  font-family: Arial, sans-serif;
}

.leaderboard h3 {
  margin-bottom: 10px;
  font-weight: bold;
}

.leaderboard ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.leaderboard li {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #555;
}
</style>
