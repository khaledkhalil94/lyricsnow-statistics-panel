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
    <div class="ui horizontal mini red statistic" v-if="newPlays">
      <div class="value">
        {{ newPlays }}
      </div>
    </div>

</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    created: function () {
      this.getStats()
    },
    methods: mapActions (['getStats']),
    computed: mapState({
      newPlays: state => state.stats.newPlays,
      totalPlays: state => state.stats.totalPlays,
      myPlays: state => state.stats.myPlays
    })
  }
</script>