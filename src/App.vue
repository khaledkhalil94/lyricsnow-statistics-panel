<template>
  <div id="app">
    <vHead :val="getValue"></vHead>
    <vBody :searchValue="searchValue"></vBody>
  </div>
</template>

<script>
import vBody from './components/Body'
import vHead from './components/Header'

export default {
  name: 'app',
  components: {
    vBody,
    vHead
  },
  data () {
    return { searchValue: '' }
  },
  methods: {
    getValue(val){
      this.searchValue = val
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
