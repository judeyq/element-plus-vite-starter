import dayjs from 'dayjs'

export function dateFormat(val, format = 'YYYY-MM-DD') {
  if (isNaN(val)) {
    return val
  }
  val = Number.parseInt(val)
  return dayjs(val).format(format)
}
