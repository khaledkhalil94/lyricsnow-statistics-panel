<template lang="html">
  <div class="pagination">
    <button class="ui icon button blue" :class="{disabled: currentPage <= 1}" @click="setPage('first')">
      <i class="angle double left icon"></i>
    </button>
    <div class="ui buttons">
      <button class="ui icon button blue" :class="{disabled: currentPage <= 1}" @click="setPage('prev')">
        <i class="angle left icon"></i>
      </button>
      <div class="or" :data-text="currentPage"></div>
      <button class="ui icon button blue" :class="{disabled: currentPage >= pages}" @click="setPage('next')">
        <i class="angle right icon"></i>
      </button>
    </div>
    <button class="ui icon button blue" :class="{disabled: currentPage >= pages}" @click="setPage('last')">
      <i class="angle double right icon"></i>
    </button>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    computed: mapState({
      pages: state => state.data.paginationCount,
      currentPage: state => state.data.paginationPage
    }),
    methods: {
      ...mapActions (['changePagPage']),
      setPage (page) {
        switch (page) {
          case 'first': this.changePagPage(0); break
          case 'prev': this.changePagPage(this.currentPage - 2); break
          case 'next': this.changePagPage(this.currentPage); break
          case 'last': this.changePagPage(this.pages - 1); break
        }
      }
    }
  }
</script>

<style scoped>
  button.icon {
    margin: 0 1px;
  }
  .pagination {
    text-align: center;
  }
</style>