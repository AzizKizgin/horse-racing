<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { Horse } from '../models/horse'

// Props for horses
const props = defineProps<{
  horses: Horse[]
}>()

const store = useStore()
const showHorses = computed(() => store.state.showHorseList)

// assume this controls visibility
</script>

<template>
  <div
    v-if="showHorses"
    class="modal-overlay"
    @click.self="store.commit('setShowHorseList', false)"
  >
    <div class="leaderboard">
      <h3>Leaderboard</h3>
      <ul>
        <li v-for="(horse, index) in horses" :key="horse.id">
          <span class="color-dot" :style="{ backgroundColor: horse.color }"></span>
          {{ index + 1 }}. Horse #{{ horse.id }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.leaderboard {
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  width: 250px;
  color: black;
  font-family: Arial, sans-serif;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #555;
}
</style>
