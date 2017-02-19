<template lang="html">
  <div class="ui pagination menu">
    <a
    class="item"
    :class="{active: currentPage === i+1}"
    @click="changePagPage(i)"
    v-for="(item, i) in pages">
      {{ i+1 }}
    </a>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions } from 'vuex'

  export default {
    methods: mapActions (['changePagPage']),
    computed: {
      pages() {
        return this.$store.state.paginationCount
      },
      currentPage () {
        return this.$store.state.paginationPage
      }
    }
  }
</script>