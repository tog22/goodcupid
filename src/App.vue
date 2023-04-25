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
