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
    <div class="right menu" v-if="this.$route.name === 'err'">
      <div class="item">
        <div class="ui toggle checkbox">
          <input type="checkbox" name="public" v-model="toggle">
          <label>Enable delete</label>
        </div>
      </div>
      <a class="item right" @click="logout">Log out</a>
    </div>
    <a class="item right" v-else @click="logout">Log out</a>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'header',
    data () {
      return { value: '', toggle: this.togg }
    },
    props: ['val'],
    watch: {
      value: function (a) {
        this.val(a)
      },
      toggle: function(x) {
        this.updateState()
      }
    },
    computed: mapState({togg: state => state.enableDelete }),
    methods: {
      ...mapActions (['setLogout', 'updateState']),
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