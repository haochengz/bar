<!-- A Vue component is typically a single `.vue` file that includes three
 sections: <script>, <template>, and <style>. This design follows the
 principle of high cohesion and low coupling, allowing all aspects of a
 component - structure, behavior, and style - to be written and
 maintained in one place, which improves development efficiency and
 readability.
-->

<script setup lang="ts">
// Here is a setup() function, it'll be executed once when the component is
// created. All the reactive variables, computed properties, and hooks should
// be defined here.
// It'll return an object that will be exposed to the template.
// If you are using `<script setup>`, you don't need to return anything,
// the variables defined in the script will be automatically available in the
// template.
import { ref } from 'vue';
// `ref` is a fundamental reactive data structure in Vue. Its purpose is to
// make primitive data types reactive so that their values can be accessed
// in the template. Reactive means that Vue automatically tracks changes to
// reactive variables, and whenever these variables change, the DOM is updated
// accordingly, reflecting the changes in the UI.

defineProps<{ msg: string }>();
// When receiving a variable from a paren component, you can pass it as a prop.
// In the child component, you can use `defineProps` to receive it. The
// received value can be used directly in the template, and it is reactive - if
// the parent updates the value, the UI in the child component will
// automatically update.

const count = ref(0);
// This defines a reactive object `count`, whose actual value is stored in
// `count.value`. However, in the template, you can directly use `count` - Vue
// will automatically unwrap the value and update the DOM reactively.
// Although no type is explicitly declared, the value is still type-safe due
// to TypeScript's inference. You can also explicitly specify the type
// like this: `const count = ref<number>(0)`.
</script>

<template>
  <h1>{{ msg }}</h1>
  <!--This is an interpolation expression used to insert a variable into 
  the template. It can reference a reactive variable defined in setup(), or
  a prop received via defineProps().-->

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <!--This is a button element that displays the current count value.
    This {{ count }} interpolation references a variable that should be
    created using ref() to ensure reactivity - so the UI updates automatically
    when count changes. The @click directive is shorthand for v-on:click, and
    it binds a JavaScript expression to the click event.-->
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
      <!--The code tag is typically used to display code snippets or file paths
      in documentation or user interfaces.
      It highlights inline code and is often shown in monospace font for
      readability, but it does not execute any code.-->
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the
    official Vue + Vite starter
    <!--This is an external link. The target="_blank" attribute makes the link
    open in a new browser tab.-->
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
/* 
<style scoped> in Vue means that the CSS styles defined in the <style> block
will apply only to the current component, not globally.
This prevents styles from leaking in or out the component, ensuring better
modularity and maintainability.
*/
.read-the-docs {
  color: #888;
}
</style>
