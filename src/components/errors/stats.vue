<template lang="html">
  <div class="stats">
    <div class="ui horizontal statistic" v-for="(item, k, i) in sources">
      <div class="value">
        {{ item }}
      </div>
      <div class="label">
        {{ k }}
      </div>
    </div>
    <div class="ui horizontal statistic" style="float: right;">
      <div class="value">
        {{ not_found }}
      </div>
      <div class="label">
        Not Found
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
        not_found: 0,
        sources: [],
      }
    },
    created: function () {
      axios.get(HOST + '/controller/stats.php', {
        params: {
          action: 'sources'
        }
      }).then(res => {
        let data = res.data
        this.not_found = data.nf
        delete data.nf
        this.sources = data
      }).catch(res => {
        console.log(res)
      })
    },
  }
</script>