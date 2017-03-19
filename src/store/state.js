const state = {
  stats: {
    msgsCount: 0,
    donations: 0,
    newPlays: 0,
    totalPlays: 0,
    data: {
      connection: {
        connectionStatus: false,
        upTime: null
      },
      newPlays: [],
      rows: []
    }
  },
  data: {
    originalRows: [],
    paginationCount: 0,
    displayCount: 15,
    paginationPage: 1,
    displayOffset: 0,
    order: 'count',
    username: null
  },
  request: {
    statsReqCalled: false,
    intervalTime: 5
  },
  logged: false,
  errMsg: null,
  enableDelete: false,
}

export default state