<template lang="html">
  <div class="ui sortable red selectable celled table">
    <thead>
      <tr>
        <th>#</th>
        <th class="collapsing"></th>
        <th @click="(e) => sortBy(e.target, 'username')">Username</th>
        <th @click="(e) => sortBy(e.target, 'artist')">Artist</th>
        <th @click="(e) => sortBy(e.target, 'track')">Title</th>
        <th @click="(e) => sortBy(e.target, 'date')">Date</th>
        <th @click="(e) => sortBy(e.target, 'count')">Count</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rowsDisplay">
        <td class='collapsing'>{{ i }}</td>
        <td class='collapsing'><i class='ui icon black link remove'></i></td>
        <td><a :href="'http://www.last.fm/user/' + row.username">{{ row.username }}</a></td>
        <td>{{ row.artist }}</td>
        <td>{{ row.track }}</td>
        <td>{{ row.date }}</td>
        <td>{{ row.count }}</td>
      </tr>
    </tbody>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        rows: []
      }
    },
    props: ['searchValue'],
    created: function () {
      axios.get('http://localhost:1334/server/controller/stats.php', {
        params: {
          action: 'errorsData'
        }
      }).then(res => {
        let data = res.data
        this.rows.push(...data)
        this.setCount(Math.ceil(data.length/this.getDisplayCount))
      }).catch(res => {
        console.log(res)
      })
    },
    computed: {
      getDisplayCount () {
        return this.$store.state.displayCount
      },
      getDisplayOffset () {
        return this.$store.state.displayOffset
      },
      rowsDisplay () {
        return this.rows.slice(this.getDisplayOffset, this.getDisplayCount+this.getDisplayOffset)
      }
    },
    methods: {
      ...mapActions (['setCount']),
      sortBy (n, e) {
        const ths = [...document.getElementsByTagName('th')]
        const isDsc = n.className.substring(7) === 'descending'
        ths.forEach((e) => e.className = 'sort')
        n.className = isDsc ? 'sorted ascending' : 'sorted descending'

        if (e === 'date') this.rows.sort((a, b) => new Date(a[e]) - new Date(b[e])).reverse()
        else if (e === 'count') this.rows.sort((a, b) => a.count - b.count).reverse()
        else this.rows.sort((a, b) => a[e].toLowerCase() > b[e].toLowerCase() ? 1 : a[e].toLowerCase() < b[e].toLowerCase() ? -1 : 0)

        if(isDsc) this.rows.reverse()
      }
    },
    watch: {
      searchValue: function(a) {
        this.rowsDisplay = this.rows.filter(row => row.username.toLowerCase().indexOf(a.toLowerCase()) !== -1)
      }
    }
  }
</script>
