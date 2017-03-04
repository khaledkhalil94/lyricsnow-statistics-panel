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
      <tr v-for="(row, i) in originalRows">
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
  import { mapActions, mapState } from 'vuex'
  import { HOST, MakeDate } from '../../utils/'

  export default {
    components: {
      MakeDate
    },
    props: ['searchValue'],
    created: function () {
      this.changePagPage(0)
    },
    computed: mapState({
      originalRows: state => state.data.originalRows,
      enableDelete: state => state.enableDelete
    }),
    methods: {
      ...mapActions (['updateRows', 'changePagPage', 'setOrder']),
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
          .then(res => (res.status === true) ? this.updateRows({track: res.track, artist: res.artist}) : null)
          .catch(res => console.log(res))
      },
      sortBy (n, e) {
        this.setOrder(e)
        const ths = [...document.getElementsByTagName('th')]
        ths.forEach((e) => e.className = '')
        n.className = (['date', 'count'].indexOf(e) === -1) ? 'sorted ascending' : 'sorted descending'
      },
    }
  }
</script>