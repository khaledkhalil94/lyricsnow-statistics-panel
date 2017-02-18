<template lang="html">
  <div class="ui sortable red selectable celled table">
    <thead>
      <tr>
        <th>#</th>
        <th @click="(e) => sortBy(e.target, 'username')">Username</th>
        <th @click="(e) => sortBy(e.target, 'artist')">Message</th>
        <th @click="(e) => sortBy(e.target, 'date')">Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows">
        <td class='collapsing'>{{ i }}</td>
        <td><a :href="'http://www.last.fm/user/' + row.username">{{ row.username }}</a></td>
        <td>{{ row.artist }}</td>
        <td>{{ row.date }}</td>
      </tr>
    </tbody>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return { rows: [] }
    },
    created: function () {
      axios.get('http://localhost:1334/server/controller/stats.php', {
        params: {
          action: 'getMessages'
        }
      }).then(res => {
        let data = res.data
        this.rows.push(...data)
      }).catch(res => {
        console.log(res)
      })
    }
  }
</script>
