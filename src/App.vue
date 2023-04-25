<template>
  <Menu_Bar/>

  <RouterView />
</template>

<script>
/*******************
 **   ⤵️ IMPORTS   **
 *******************/

// External libraries
import { defineComponent, provide } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// Auxiliaries
import store from '@/store/Store'

// Components
import Menu_Bar from '@/components/chrome/Menu_Bar.vue'

/*********************
 **   *️⃣ MAIN CODE   **
 *********************/

export default defineComponent({
  name: 'App',
  components: {
    Menu_Bar
  },
  setup() {
    /*******************
     **  📦 DATA STORE **
     *******************/
    provide('store', store)
    let store_state = store.state
  }
})

/*******************
 **	🛠 FUNCTIONS  **
 *******************/

function fcm_body_to_object(string) {
  string.replace('"', '"') // eslint-disable-line
  let object = JSON.parse(string)
  return object
}

function lo(to_log) {
  console.log(to_log)
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
