<script setup>
import PlantCard from '../components/PlantCard.vue'
import { ref, onServerPrefetch, onMounted } from 'vue'

const getPlantsLocal = () => {
  if (import.meta.env.SSR) {
    return
  }

  const plantsDataJson = document.querySelector('#plants-data')?.dataset?.json
  const plantsDataJsonParsed = plantsDataJson && JSON.parse(plantsDataJson)

  return plantsDataJsonParsed
}

const plants = ref(getPlantsLocal())

const fetchPlants = async () => {
  const query = `{ 
    plantCollection {
      items {
        sys {
          id
        }
        commonName
        scientificName
        image {
          url
          description
        }
        wateringSchedule
        lastWatered
        sunlight
        happiness
      }
    }
  }`

  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}`

  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }

  try {
    const response = await fetch(fetchUrl, fetchOptions).then((response) => response.json())
    return response?.data?.plantCollection?.items
  } catch (error) {
    throw new Error('Could not receive the data from Contentful!')
  }
}

onServerPrefetch(async () => {
  plants.value = await fetchPlants()
})

onMounted(async () => {
  if (!plants.value) {
    plants.value = getPlantsLocal() || (await fetchPlants())
  }
})
</script>

<template>
  <main>
    <ul v-if="plants" class="plants">
      <li v-for="plant in plants" :key="plant.sys.id" class="plant-container">
        <PlantCard :plant="plant" />
      </li>
    </ul>
  </main>
  <component
    :is="'script'"
    id="plants-data"
    type="text/plain"
    :data-json="JSON.stringify(plants)"
  />
</template>

<style scoped>
main {
  background-color: white;
  min-height: 100vh;
}
.plants {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: auto;
  max-width: 1280px;
}

.plant-container {
  margin: 10px auto 40px auto;
  border: 1px solid #2d4a2f;
  outline: 2px solid white;
  box-shadow: 3px 3px 0 #2d4a2f;
  position: relative;
}

@media screen and (min-width: 992px) {
  .plants {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
