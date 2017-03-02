<template lang="html">
  <div class="ui sortable red padded selectable celled table">
    <thead>
      <tr>
        <th>#</th>
        <th>Username</th>
        <th>Message</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows">
        <td class='collapsing'>{{ i+1 }}</td>
        <td><a :href="'http://www.last.fm/user/' + row.name">{{ row.name }}</a></td>
        <td>{{ row.message }}</td>
        <td><MakeDate :date="row.date" /></td>
      </tr>
    </tbody>
  </div>
</template>

<script>
  import axios from 'axios'
  import { HOST } from '../../utils/config'
  import MakeDate from '../../utils/date'
  import moment from 'moment'

  export default {
    components: {
      MakeDate
    },
    data () {
      return { rows: [], moment }
    },
    created: function () {
      axios.get(HOST + '/controller/stats.php', {
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
