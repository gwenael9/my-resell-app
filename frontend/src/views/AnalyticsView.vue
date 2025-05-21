<template>
  <div class="analytics-container">
    <h2>Informations du Consumer Kafka</h2>
    <div v-if="loading" class="loading">Chargement des informations...</div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="consumerInfo" class="consumer-info">
      <div class="info-card">
        <h2>État du Consumer</h2>
        <p>
          <span class="label">Statut:</span>
          <span
            :class="[
              'status',
              consumerInfo.isConsumerRunning ? 'running' : 'stopped',
            ]"
          >
            {{
              consumerInfo.isConsumerRunning ? "En cours d'exécution" : "Arrêté"
            }}
          </span>
        </p>
        <p>
          <span class="label">Groupe:</span>
          <span>{{ consumerInfo.groupId }}</span>
        </p>
      </div>

      <div class="info-card">
        <h2>Topics Abonnés</h2>
        <ul class="topics-list">
          <li v-for="topic in consumerInfo.topics" :key="topic">
            {{ topic }}
          </li>
        </ul>
      </div>
    </div>

    <div class="click-events-section">
      <h2>Événements de Clics</h2>
      <div v-if="loadingClicks" class="loading">
        Chargement des événements...
      </div>
      <div v-else-if="clickError" class="error">
        {{ clickError }}
      </div>
      <div v-else class="click-events-table">
        <table>
          <thead>
            <tr>
              <th>Chemin</th>
              <th>Nombre de clics</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(count, path) in clickCountByPath" :key="path">
              <td>{{ path }}</td>
              <td>{{ count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import apiClient from "@/api";

interface ConsumerInfo {
  isConsumerRunning: boolean;
  groupId: string;
  topics: string[];
}

interface ClickEvent {
  timestamp: string;
  data: {
    userId: string;
    path: string;
    elementId: string;
    text: string;
  };
}

const consumerInfo = ref<ConsumerInfo | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const clickEvents = ref<ClickEvent[]>([]);
const loadingClicks = ref(true);
const clickError = ref<string | null>(null);

const clickCountByPath = computed(() => {
  const counts: { [key: string]: number } = {};
  clickEvents.value.forEach((event) => {
    counts[event.data.path] = (counts[event.data.path] || 0) + 1;
  });
  return counts;
});

const fetchConsumerInfo = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await apiClient.get("/consumer-info");
    console.log("responseeeee", response.data);
    consumerInfo.value = response.data;
  } catch (err) {
    error.value = "Erreur lors de la récupération des informations du consumer";
    console.error("Erreur:", err);
  } finally {
    loading.value = false;
  }
};

const fetchClickEvents = async () => {
  try {
    loadingClicks.value = true;
    clickError.value = null;
    const response = await apiClient.get("/click-events");
    console.log("responseee click", response.data);
    clickEvents.value = response.data;
  } catch (err) {
    clickError.value = "Erreur lors de la récupération des événements de clics";
    console.error("Erreur:", err);
  } finally {
    loadingClicks.value = false;
  }
};

onMounted(() => {
  fetchConsumerInfo();
  fetchClickEvents();
});
</script>

<style scoped>
.analytics-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.consumer-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-card h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.label {
  font-weight: bold;
  margin-right: 0.5rem;
  color: #666;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
}

.status.running {
  background-color: #2ecc71;
  color: white;
}

.status.stopped {
  background-color: #e74c3c;
  color: white;
}

.topics-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.topics-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.topics-list li:last-child {
  border-bottom: none;
}

.click-events-section {
  margin-top: 3rem;
}

.click-events-table {
  margin-top: 1rem;
}

.click-events-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.click-events-table th,
.click-events-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.click-events-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #2c3e50;
}

.click-events-table tr:last-child td {
  border-bottom: none;
}

.click-events-table tr:hover {
  background-color: #f8f9fa;
}
</style>
