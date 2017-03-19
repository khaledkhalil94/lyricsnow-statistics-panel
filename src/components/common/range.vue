<template lang="html">
  <div class="item">
    <span>Interval: {{ value }}</span>
    <div class="range slider">
      <input type="range" min="1" max="30" v-model="value">
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    data (){
      return {
        active: false,
        value: this.v,
        to: null
      }
    },
    created: function(){
      this.value = this.v
    },
    computed: mapState({
      v: state => state.request.intervalTime
    }),
    methods: {
      ...mapActions(['setIntervalTime']),
      changeState() {
        this.active = !this.active
      }
    },
    watch: {
      value: function(){
        if(this.to) clearTimeout(this.to)
        this.to = setTimeout(() => {
          this.setIntervalTime(this.value)
        }, 3000)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .range.slider
    display: none
    position: absolute
    padding: 10px 13px
    width: 160px
    left: 95px
    z-index: 5
    background-color: white
    span
      margin-left: 10px
  div.item
    cursor: pointer
    &:hover .range.slider
      display: block

</style>
<style scoped>
  input[type=range] {
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #2185D0;
    border-radius: 4px;
    border: 0px solid #000000;
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid #BCC0E3;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    background: #FCFEFF;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8.5px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #2185D0;
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #2185D0;
    border-radius: 4px;
    border: 0px solid #000000;
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid #BCC0E3;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    background: #FCFEFF;
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: #2185D0;
    border: 0px solid #000000;
    border-radius: 8px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type=range]::-ms-fill-upper {
    background: #2185D0;
    border: 0px solid #000000;
    border-radius: 8px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type=range]::-ms-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid #BCC0E3;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    background: #FCFEFF;
    cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: #2185D0;
  }
  input[type=range]:focus::-ms-fill-upper {
    background: #2185D0;
  }
</style>