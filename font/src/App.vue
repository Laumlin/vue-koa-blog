<template>
  <div id="app">
      <v-header></v-header>
      <v-main></v-main>
      <v-scroll></v-scroll>
      <v-footer></v-footer>
  </div>
</template>

<script>
import header from './components/header'
import main from './components/main'
import footer from './components/footer'
import scroll from './components/scroll'
export default {
  name: 'App',
  components: {
   'v-header': header,
   'v-main': main,
   'v-footer': footer,
   'v-scroll': scroll
  },
}
</script>

<style scoped>
#app {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f4f4f4;
}
</style>
