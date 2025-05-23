<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { Horse } from '../models/horse'
import '../assets/main.css'

// Props
const props = defineProps<{
  horses: Horse[]
}>()

const store = useStore()
const showHorses = computed(() => store.state.showHorseList)
</script>

<template>
  <div
    v-if="showHorses"
    class="modal-overlay"
    @click.self="store.commit('setShowHorseList', false)"
  >
    <div class="leaderboard">
      <h3>Horses</h3>
      <ul>
        <li v-for="(horse, index) in horses" :key="horse.id">
          <span class="color-dot" :style="{ backgroundColor: horse.color }"></span>
          {{ index + 1 }}. Horse #{{ horse.id }}
        </li>
      </ul>
    </div>

    <button class="close-btn" @click="store.commit('setShowHorseList', false)">Close</button>
  </div>
</template>

<style scoped>
.leaderboard {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  width: 280px;
  color: #222;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.leaderboard h3 {
  margin-bottom: 12px;
  font-size: 1.5rem;
  text-align: center;
}

.leaderboard ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.leaderboard li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 1rem;
}
</style>
