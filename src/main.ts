import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app');

// In a Vue project, main.ts is the entry point of the application. It is 
// responsible for importing the root component (ussally App.vue) and global
// styles (such as style.css), and it uses createApp(App).mount('#app') to
// mount the application to the <div> element with id="app" in index.html.

// The index.html file serves as the HTML template of the entire application.
// Vite automatically injects the entry script into this file and starts the
// app. Although you write <script type="module" src="/src/main.ts">, it is
// Vite that handles the module resolution and build process behind the scenes.

// Once the root component and basic structure are initialized, you can begin
// creating your own child components. To use a child component, you need to
// import it in the script and then include it in the template. This approach
// enables modular development, component reuse, and flexible UI composition.

console.log('ENV: ', import.meta.env);