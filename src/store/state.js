const state = {
  stats :{
    msgsCount: 0,
    newPlays: 0,
    totalPlays: 0,
    myPlays: 0
  },
  logged: false,
  errMsg: null,
  originalRows: [],
  paginationCount: 0,
  displayCount: 15,
  paginationPage: 1,
  displayOffset: 0,
  enableDelete: false
}

export default state