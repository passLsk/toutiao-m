export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return err
  }
}
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
// 移除指定key的本地存储
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
// 移除所有的本地存储
export function clearItem () {
  window.localStorage.clearItem()
}
