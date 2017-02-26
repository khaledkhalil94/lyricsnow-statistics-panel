<template lang="html">
  <div class="ui top menu">
    <router-link class="item" active-class='active' to="/" exact>Stats</router-link>
    <router-link class="item" active-class='active' to="/errors">Errors</router-link>
    <router-link class="item" active-class='active' to="/msgs">Messages</router-link>
    <div v-if="this.$route.name !== 'msgs'" class="menu">
      <div class="item">
        <div class="ui icon input">
          <input type="text" v-model="value" placeholder="Search...">
          <i class="search link icon"></i>
        </div>
      </div>
    </div>
    <a class="item right" @click="logout">Log out</a>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'header',
    data () {
      return { value: '' }
    },
    props: ['val'],
    watch: {
      value: function (a) {
        this.val(a)
      }
    },
    methods: {
      ...mapActions (['setLogout']),
      logout (){
        this.setLogout()
        this.$router.push({'path': '/login'})
      }
    }
  }
</script>

<style scoped>
  .ui.top.menu {
    min-height: 50px;
  }
</style>