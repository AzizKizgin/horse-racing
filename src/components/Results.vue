<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

// Props for isshowResults

const store = useStore()
const results = computed(() => store.state.results)
const round = computed(() => store.state.round)
const showResults = computed(() => store.state.showResults)
// assume this controls visibility
</script>

<template>
  <div v-if="showResults" class="modal-overlay" @click.self="store.commit('setShowResults', false)">
    <div class="results-container">
      <div v-for="(horses, key) in results" :key="key" class="result-board">
        <div class="result">
          <h3>Leaderboard</h3>
          <h3>Round: {{ Number(key) + 1 }} - {{ 1200 + Number(key) * 200 }} meters</h3>
          <ul>
            <li v-for="(horse, horseIndex) in horses" :key="horse.id">
              <span class="color-dot" :style="{ backgroundColor: horse.color }"></span>
              {{ horseIndex + 1 }}. Horse #{{ horse.id }}
            </li>
          </ul>
        </div>
      </div>
      <button class="close-btn" @click="store.commit('setShowResults', false)">Close</button>
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

.results-container {
  background: white;
  width: 90%;
  height: 90%;
  overflow-y: auto;
  padding: 20px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.result-board {
  margin-bottom: 20px;
}

.result {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.color-dot {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #555;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #333;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
