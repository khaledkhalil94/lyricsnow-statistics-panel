const state = {
  stats: {
    msgsCount: 0,
    newPlays: 0,
    totalPlays: 0,
    myPlays: 0
  },
  data: {
    originalRows: [],
    paginationCount: 0,
    displayCount: 15,
    paginationPage: 1,
    displayOffset: 0,
    order: 'count'
  },
  logged: false,
  errMsg: null,
  enableDelete: false
}

export default state