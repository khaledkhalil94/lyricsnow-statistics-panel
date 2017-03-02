<template lang="html">
  <div class="ui sortable red selectable celled table">
    <thead>
      <tr>
        <th>#</th>
        <th @click="(e) => sortBy(e.target, 'username')">Username</th>
        <th @click="(e) => sortBy(e.target, 'artist')">Artist</th>
        <th @click="(e) => sortBy(e.target, 'track')">Title</th>
        <th @click="(e) => sortBy(e.target, 'date')">Date</th>
        <th @click="(e) => sortBy(e.target, 'count')">Count</th>
        <th class="collapsing" v-if="enableDelete"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rowsDisplay">
        <td class='collapsing'>{{ i+1 }}</td>
        <td><a :href="'http://www.last.fm/user/' + row.username">{{ row.username }}</a></td>
        <td><a :href="'http://www.last.fm/music/' + row.artist" v-html="row.artist">{{ row.artist }}</a></td>
        <td v-html="row.track"></td>
        <td><MakeDate :date="row.date" /></td>
        <td>{{ row.count }}</td>
        <td class='collapsing' v-if="enableDelete"><i @click="removeItem(row.id)" class='ui icon black link remove'></i></td>
      </tr>
    </tbody>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import { mapActions, mapState } from 'vuex'
  import { sortDate, HOST, MakeDate } from '../../utils/'

  export default {
    components: {
      MakeDate
    },
    data () {
      return {
        rows: [],
        moment
      }
    },
    props: ['searchValue'],
    created: function () {
      axios.get(HOST + '/controller/stats.php', {
        params: {
          action: 'errorsData'
        }
      }).then(res => {
        let data = res.data
        this.rows.push(...data)
        this.setRows(data)
      }).catch(res => {
        console.log(res)
      })
    },
    computed: {
      ...mapState({
        originalRows: state => state.originalRows,
        displayCount: state => state.displayCount,
        enableDelete: state => state.enableDelete,
        displayOffset: state => state.displayOffset
      }),
      getDisplayCount () {
        return this.displayCount
      },
      getDisplayOffset () {
        return this.displayOffset
      },
      rowsDisplay () {
        return this.rows.slice(this.getDisplayOffset, this.getDisplayCount+this.getDisplayOffset)
      }
    },
    methods: {
      ...mapActions (['setCount', 'setRows', 'updateRows']),
      removeItem(id){
        const URL = HOST + '/controller/delete.php'
        const body = JSON.stringify({
          action: 'deleteRecord',
          id
        })
        const req = new Request(URL, {
          method: 'POST',
          body: body,
        })

        fetch(req)
          .then(res => res.json())
          .then(res => {
            if(res.status === true) {
              this.rows = this.rows.filter(i => !(i.track === res.track && i.artist === res.artist))
            }
          })
          .catch(res => console.log(res))
      },
      sortBy (n, e) {
        const ths = [...document.getElementsByTagName('th')]
        const isDsc = n.className.substring(7) === 'descending'
        ths.forEach((e) => e.className = 'sort')
        n.className = isDsc ? 'sorted ascending' : 'sorted descending'

        if (e === 'date') sortDate(this.rows, e)
        else if (e === 'count') this.rows.sort((a, b) => a.count - b.count).reverse()
        else this.rows.sort((a, b) => a[e].toLowerCase() > b[e].toLowerCase() ? 1 : a[e].toLowerCase() < b[e].toLowerCase() ? -1 : 0)

        if(isDsc) this.rows.reverse()
      },
    },
    watch: {
      searchValue: function(a) {
        this.rows = this.originalRows.filter(row => row.username.toLowerCase().indexOf(a.toLowerCase()) !== -1)
      },
      rows: function (x) {
        this.setCount(Math.ceil(x.length/this.getDisplayCount))
      }
    }
  }
</script>
