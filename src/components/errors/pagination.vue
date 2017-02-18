<template lang="html">
  <div class="ui pagination menu">
    <a class="item" v-for="(item, i) in pages">
      {{ i+1 }}
    </a>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        pagess: 6
      }
    },
    props: ['count'],
    created: function () {
      console.log(this.$store)
      axios.get('http://localhost:1334/server/controller/stats.php', {
        params: {
          action: 'notfoundCount'
        }
      }).then(res => {
        let data = res.data
        this.pages = Math.ceil(data/10)
      }).catch(res => {
        console.log(res)
      })
    },
    computed:{
      pages() {
        return 3
      }
    }
  }
</script>