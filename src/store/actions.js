import { HOST } from '../utils/config'

const actions = {
  setCount: ({commit}, count) => commit('setCount', count),
  setMsgsCount: ({commit}, count) => commit('setMsgsCount', count),

  changePagPage: ({commit, state}, page) => {
    commit('changePaginationPage', page)
    const URL = `${HOST}/controller/stats.php?action=errorsData&limit=${state.displayCount}&offset=${state.displayOffset}`
    const myRequest = new Request(URL)

    fetch(myRequest)
      .then(function(res) {
          if(res.status == 200) return res.json();
          else throw new Error('Something went wrong on api server!');
      })
      .then(function(res) {
        commit('setOriginalRows', res.records)
        commit('setCount', Math.ceil(res.count/state.displayCount))
      })
      .catch(function(error) {
          console.error(error)
      })
  },

  setRows: ({commit}, rows) => commit('setOriginalRows', rows),
  setLogout: ({commit}) => commit('logout'),
  updateState: ({commit}) => commit('updateState'),

  updateRows: ({commit, state}, {artist, track}) => {
    const newArr = state.originalRows.filter((item) => item.artist !== artist && item.track !== track)
    console.log(newArr)
    commit('updateRows', newArr)
  },

  setLogin({commit}, form) {
    const URL = HOST + '/controller/login.php'
    const myRequest = new Request(URL, {
      method: 'POST',
      body: new FormData(form)
    })

    fetch(myRequest)
      .then(function(response) {
          if(response.status == 200) return response.json();
          else throw new Error('Something went wrong on api server!');
      })
      .then(function(response) {
        if(response.status === true) commit('setLogin', true)
        else commit('setErrMsg', response.err)
      })
      .catch(function(error) {
          console.error(error)
      })
  }
}

export default actions