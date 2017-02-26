<template lang="html">
  <div class="stats">
    <div class="ui horizontal statistic">
      <div class="value">
        {{ totalPlays }}
      </div>
      <div class="label">
        Total plays
      </div>
    </div>
    <div class="ui horizontal statistic">
      <div class="value">
        {{ totalPlays - myPlays }}
      </div>
      <div class="label">
        Other plays
      </div>
    </div>
    <div class="ui horizontal statistic" style="float: right;">
      <div class="value">
        {{ messages }}
      </div>
      <div class="label">
        Messages
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { HOST } from '../../utils/config'

  export default {
    data() {
      return {
        totalPlays: 0,
        myPlays: 0,
        messages: 0
      }
    },
    created: function () {
      axios.get(HOST + '/server/controller/stats.php', {
        params: {
          action: 'stats'
        }
      }).then(res => {
        let data = res.data
        this.totalPlays = data.totalPlays
        this.myPlays = data.myPlays
        this.messages = data.messages
      }).catch(res => {
        console.log(res)
      })
    },
  }
</script>