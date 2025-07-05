<!--App.vue is the root component of a modular Vue project. Child components
(like HelloWorld.vue) must be imported before use.-->
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';

import Images from './utils/images';
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
      <!--
      <img src="/vite.svg"...> The image is loaded from the public folder.
      <img alt="Vite logo"...> The alt attribute improves accessibility.
      -->
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      <!--
      <img src="./assets/vue.svg"...> The image is loaded from the 
      src/assets folder. Unlike /public, this path is processed by Vite
      as a module import.
      -->
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <!--
  <HelloWorld /> passes a prop msg to the child component. The child can
  receive it using defineProps().
  -->
  <div>
    <img :src="Images.getImage('img14.jpg')" alt="Dynamic Image" />
    <img :src="Images.getImage('img34.jpg')" alt="Dynamic Image" />
    <img :src="Images.getImage('img84.jpg')" alt="Dynamic Image" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
