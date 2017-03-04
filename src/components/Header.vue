<template lang="html">
  <div class="ui top menu">
    <a href="/">
      <div class="item">
        <img id="header_img" src="../assets/favicon.png">
      </div>
    </a>
    <a href='/' class="item">Lyrics Now</a>
    <router-link class="item" active-class='active' to="/" exact>Stats</router-link>
    <router-link class="item" active-class='active' to="/errors">Errors</router-link>
    <router-link class="item" active-class='active' to="/msgs">Messages
      <div v-if="messages > 0" class="floating ui red label">{{messages}}</div>
    </router-link>
    <div v-if="this.$route.name === 'stats'" class="menu">
      <div class="item">
        <div class="ui icon input">
          <input type="text" v-model="value" placeholder="Search...">
          <i class="search link icon"></i>
        </div>
      </div>
    </div>
    <a class="item" v-if="this.$route.name === 'stats'" @click="getStats">Refresh</a>
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
    computed: mapState({
      togg: state => state.enableDelete,
      messages: state => state.stats.msgsCount
    }),
    methods: {
      ...mapActions (['setLogout', 'updateState', 'getStats']),
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
  #header_img {
    width: 22px;
    height: auto;
  }
  .floating.ui.red.label {
    top: 0rem;
  }
</style>