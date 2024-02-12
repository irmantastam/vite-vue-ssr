<script setup>

import PlantCard from '../components/PlantCard.vue'

defineProps({
  plants: {
    type: Array,
    required: true
  }
})

</script>

<template>
  <main>
    <ul class="plants">
      <li v-for="plant in plants" :key="plant.sys.id" class="plant-container">
        <PlantCard :plant="plant"/>
      </li>
    </ul>
  </main>
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
  border: 1px solid #2D4A2F;
  outline: 2px solid white;
  box-shadow: 3px 3px 0 #2D4A2F;
  position: relative;
}

@media screen and (min-width:992px) {
  .plants {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

</style>
