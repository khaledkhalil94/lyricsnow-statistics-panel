<template lang="html">
  <div class="ui sortable red selectable celled table">
    <thead>
      <tr>
        <th>#</th>
        <th @click="(e) => sortBy(e.target, 'username')">Username</th>
        <th @click="(e) => sortBy(e.target, 'first_play')">First Play</th>
        <th @click="(e) => sortBy(e.target, 'last_play')">Last Play</th>
        <th @click="(e) => sortBy(e.target, 'count')">Plays</th>
        <th @click="(e) => sortBy(e.target, 'nf_count')">Not Found</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rowsDisplay">
        <td class='collapsing'>{{ i }}</td>
        <td><a :href="'http://www.last.fm/user/' + row.username">{{ row.username }}</a></td>
        <td v-if="row.first_play !== '0000-00-00 00:00:00'">{{ row.first_play }} <MakeDate :date="row.first_play" /></td>
        <td v-else>-</td>
        <td v-if="row.last_play !== '0000-00-00 00:00:00'">{{ row.last_play }} <MakeDate :date="row.last_play" /></td>
        <td v-else>-</td>
        <td>{{ row.count }}</td>
        <td>{{ row.nf_count }}</td>
      </tr>
    </tbody>
  </div>
</template>

<script>
import axios from 'axios'
import MakeDate from './date'
import moment from 'moment'
import { HOST } from '../utils/config'

export default {
  components: {
    MakeDate
  },
  data () {
    return { rows: [], rowsDisplay: [], moment }
  },
  created: function () {
    axios.get(HOST + '/server/controller/stats.php', {
      params: {
        action: 'tableData'
      }
    }).then(res => {
      let data = res.data
      this.rows.push(...data)
    }).catch(res => {
      console.log(res)
    })
  },
  props: ['searchValue'],
  methods: {
    sortBy (n, e) {
      const ths = [...document.getElementsByTagName('th')]
      const isDsc = n.className.substring(7) === 'descending'
      ths.forEach((e) => e.className = 'sort')
      n.className = isDsc ? 'sorted ascending' : 'sorted descending'

      if (['count', 'nf_count'].indexOf(e) !== -1) {
        this.rows.sort((a, b) => a[e] - b[e]).reverse()
      } else if (['first_play', 'last_play'].indexOf(e) !== -1) {
        this.rows.sort((a, b) => a[e].toLowerCase() > b[e].toLowerCase()).reverse()
      } else this.rows.sort((a, b) => a[e].toLowerCase() > b[e].toLowerCase())

      if(isDsc) this.rows.reverse()
    }
  },
  watch: {
    rows: function (a){
      this.rowsDisplay = a
    },
    searchValue: function(a) {
      //this.rows = this.rows.filter(obj => obj.username === a)\
      const newArr = []
      this.rows.map((item) => {
        if( item.username.toLowerCase().indexOf(a.toLowerCase()) !== -1 ) newArr.push(item);
      })
      this.rowsDisplay = newArr
    }
  }
}
</script>