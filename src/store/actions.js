import { HOST } from '../utils/config'

const actions = {
  setCount: ({commit}, count) => commit('setCount', count),
  setMsgsCount: ({commit}, count) => commit('setMsgsCount', count),

  changePagPage: ({commit, state}, page) => {
    commit('changePaginationPage', page)
    requestData(state)
      .then(res => {
        commit('setRows', res.records)
        commit('setCount', Math.ceil(res.count/state.data.displayCount))
      })
      .catch(res => console.log(res))
  },

  setOrder: ({commit, state}, order) => {
    commit('setOrder', order)
    requestData(state)
      .then(res => {
        commit('setRows', res.records)
        commit('setCount', Math.ceil(res.count/state.data.displayCount))
      })
      .catch(res => console.log(res))
  },

  getStats: ({commit, state}) => {
    commit('setNewPlays', 0)
    const URL = `${HOST}/controller/stats.php?action=stats`
    const myRequest = new Request(URL)

    fetch(myRequest)
      .then(function(res) {
          if(res.status == 200) return res.json();
          else throw new Error('Something went wrong on api server!');
      })
      .then(function(data) {
        const otherPlays = data.totalPlays - data.myPlays
        const c_otherPlays = state.stats.totalPlays - state.stats.myPlays
        const newPlays = otherPlays - c_otherPlays
        const stats = {
          totalPlays: data.totalPlays,
          myPlays: data.myPlays,
          msgsCount: data.messages
        }
        if(newPlays > 0 && c_otherPlays !== 0) commit('setNewPlays', newPlays)
        commit('setStats', stats)
      })
      .catch(function(error) {
          console.error(error)
      })
  },
  setLogout: ({commit}) => commit('logout'),
  updateState: ({commit}) => commit('updateState'),

  updateRows: ({commit, state}, {artist, track}) => {
  const newArr = state.data.originalRows.filter(i => !(i.artist === artist && i.track === track))
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

const requestData = (state) => {
  const { displayCount, displayOffset, order } = state.data
  return new Promise((resolve, reject) => {

    const URL = `${HOST}/controller/stats.php?action=errorsData&limit=${displayCount}&offset=${displayOffset}&order=${order}`
    const myRequest = new Request(URL)

    fetch(myRequest)
      .then(function(res) {
          if(res.status == 200) return res.json();
          else reject('Something went wrong on api server!');
      })
      .then(function(res) {
        resolve(res)
      })
      .catch(function(error) {
          reject(error)
      })
  })
}

export default actions