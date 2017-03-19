<template lang="html">
  <div class="ui top menu">
    <a href="http://lyricsnow.us">
      <div class="item">
        <img id="header_img" src="../assets/favicon.png">
      </div>
    </a>
    <a href='http://lyricsnow.us' class="item">Lyrics Now</a>
    <router-link class="item" active-class='active' to="/" exact>Stats</router-link>
    <router-link class="item" active-class='active' to="/errors">Errors</router-link>
    <!-- Messages -->
    <router-link class="item" active-class='active' to="/msgs">Messages
      <div v-if="messages > 0" class="floating ui red label">{{messages}}</div>
    </router-link>
    <!-- Dons -->
    <router-link class="item" active-class='active' to="/donations">Donations
      <div v-if="donations > 0" class="floating ui green label">{{donations}}</div>
    </router-link>
    <!-- Search Item -->
    <div v-if="this.$route.name !== 'msgs'" class="menu">
      <div class="item">
        <div class="ui input" :class="{ action: this.$route.name === 'err'}">
          <input type="text" v-model="value" placeholder="Search...">
          <button v-if="this.$route.name === 'err'" class="ui button button" @click="setName">
            <i class="ui icon arrow right"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- Interval time slider -->
    <Range v-if="this.$route.name === 'stats'" />
    <Status />
    <Uptime />
    <!-- Delete Button -->
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
  import Range from './common/range'
  import Status from './common/conStatus'
  import Uptime from './common/upTime'

  export default {
    name: 'header',
    components: {
      Range, Status, Uptime
    },
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
      messages: state => state.stats.msgsCount,
      donations: state => state.stats.donations
    }),
    methods: {
      ...mapActions (['setLogout', 'updateState', 'setUsername','changePagPage']),
      logout (){
        this.setLogout()
        this.$router.push({'path': '/login'})
      },
      setName (){
        this.setUsername(this.value)
        this.changePagPage(0)
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
  .floating.ui.label {
    top: 0rem;
  }
  .ui.input button {
    padding-left: 10px;
  }
</style>