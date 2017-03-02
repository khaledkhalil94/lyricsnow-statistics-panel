import MakeDate from './date'
import { HOST } from './config'

const sortDate = (rows, e) => rows.sort((a, b) => {
  let v1 = new Date(a[e]).getTime(), v2 = new Date(b[e]).getTime()
  if (isNaN(v1)) v1 = 0
  if (isNaN(v2)) v2 = 0
  return v1 - v2
}).reverse()

module.exports = { MakeDate, HOST, sortDate }