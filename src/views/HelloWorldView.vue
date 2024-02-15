<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <main>
    <div class="hello-world">
      <h1>{{ msg }}</h1>

      <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
        <p>
          Edit
          <code>views/HelloWorldView.vue</code> to test HMR
        </p>
      </div>

      <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the
        official Vue + Vite starter
      </p>
      <p>
        Install
        <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
        in your IDE for a better DX
      </p>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: white;
  min-height: 100vh;
  padding: 20px;
}

.hello-world {
  max-width: 1280px;
  margin: auto;
  text-align: center;
}

.hello-world p {
  margin: 10px 0;
}
</style>
