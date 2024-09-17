<template>
  <div id="app">
    <Header />
    <Footer />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Layout/Header.vue"
import Footer from "./components/Layout/Footer.vue"

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
