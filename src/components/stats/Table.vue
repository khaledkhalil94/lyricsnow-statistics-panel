<template lang="html">
  <div class="ui sortable red selectable celled table">
    <thead>
      <tr>
        <th>#</th>
        <th @click="(e) => sortBy(e.target, 'username')">Username</th>
        <th @click="(e) => sortBy(e.target, 'first_play')" id="first_play">First Play</th>
        <th @click="(e) => sortBy(e.target, 'last_play')" id="last_play">Last Play</th>
        <th @click="(e) => sortBy(e.target, 'count')">Plays</th>
        <th @click="(e) => sortBy(e.target, 'nf_count')">Not Found</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rowsDisplay" @click="activateRow" :id="row.id">
        <td class='collapsing'>{{ i+1 }}</td>
        <td><a :href="'http://www.last.fm/user/' + row.username">{{ row.username }}</a></td>
        <td v-if="row.first_play !== '0000-00-00 00:00:00'"><MakeDate :date="row.first_play" /></td>
        <td v-else>-</td>
        <td v-if="row.last_play !== '0000-00-00 00:00:00'"><MakeDate :date="row.last_play" /></td>
        <td v-else>-</td>
        <td>{{ row.count }}</td>
        <td>{{ row.nf_count }}</td>
      </tr>
    </tbody>
  </div>
</template>

<script>
  import { sortDate, HOST, MakeDate } from '../../utils/'
  import { mapActions, mapState } from 'vuex'

  export default {
    components: {
      MakeDate
    },
    data () {
      return {
        rowsDisplay: [],
        activeNode: null
      }
    },
    created: function () {
      this.getStatsData()
    },
    props: ['searchValue'],
    computed: mapState({
      rows: state => state.stats.data.rows
    }),
    methods: {
      ...mapActions(['getStatsData']),
      activateRow(x){
        if(this.activeNode) this.activeNode.className = ''
        x.target.closest('tr').className = 'active'
        this.activeNode = x.target.parentNode
      },
      sortBy (n, e) {
        const ths = [...document.getElementsByTagName('th')]
        const isDsc = n.className.substring(7) === 'descending'
        ths.forEach((e) => e.className = 'sort')
        n.className = isDsc ? 'sorted ascending' : 'sorted descending'

        if (['count', 'nf_count'].indexOf(e) !== -1) {
          this.rows.sort((a, b) => a[e] - b[e]).reverse()
        } else if (['first_play', 'last_play'].indexOf(e) !== -1) sortDate(this.rows, e)
         else this.rows.sort((a, b) => a[e].toLowerCase() > b[e].toLowerCase() ? 1 : a[e].toLowerCase() < b[e].toLowerCase() ? -1 : 0)

        if(isDsc) this.rows.reverse()
      }
    },
    watch: {
      rows: function (a){
        this.rowsDisplay = a
      },
      searchValue: function(a) {
        const newArr = []
        this.rows.map((item) => {
          if( item.username.toLowerCase().indexOf(a.toLowerCase()) !== -1 ) newArr.push(item);
        })
        this.rowsDisplay = newArr
      }
    }
  }
</script>

<style media="screen">
  .ui.table tr.positive {
    background-color: #e7ffd1!important;
  }
</style>