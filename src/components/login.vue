<template lang="html">
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <div class="info">
        <img class="ui image" src="../assets/favicon.png" height="80px" />
      </div>
      <form class="ui large form">
        <div class="ui segment">
          <div class="field">
            <div class="ui left input">
              <input type="text" name="username" placeholder="Username" v-model="username">
            </div>
          </div>
          <div class="field">
            <div class="ui left input">
              <input type="password" name="password" placeholder="Password" v-model="password">
            </div>
          </div>
          <div class="ui fluid large violet submit button" @click="handleLogin">Login</div>
        </div>
        <div class="ui error message" v-if="errMsg">
          <p>{{ errMsg }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      ...mapState({
        logged: state => state.logged,
        errMsg: state => state.errMsg
      }),
    },
    methods: {
      ...mapActions (['setLogin']),
      handleLogin (e) {
        let form = document.querySelector('form')
        this.setLogin(form)
      }
    },
    watch: {
      logged (a) {
        if(a) this.$router.push({'path': '/'})
      }
    }
  }
</script>

<style scoped>
  .ui.middle.aligned.center.aligned.grid {
    padding-top: 8%;
  }
  body > .grid {
    height: 100%;
  }
  .column {
    max-width: 450px;
  }
  .info {
    display: flex;
    padding-bottom: 30px;
    justify-content: center;
  }
  h2 {
    color: #e83d73;
    padding-left: 40px;
    font-size: 40px;
  }
  .ui.error.message {
    display: inherit;
  }
</style>
