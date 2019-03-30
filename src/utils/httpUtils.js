const BASE_URL_PATH = 'http://ysup.free.idcfengye.com/mybatis'
const USER_ID_KEY = 'USERID'
const TOKEN_KEY = 'TOKEN'
const ENV_VERSION = '1.0'

const request = function (path, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })

  let user_id = ''
  let token = ''
  try {
    user_id = wx.getStorageSync(USER_ID_KEY)
    token = wx.getStorageSync(TOKEN_KEY)
  } catch (e) {
  }
  header = header || {}
  let cookie = []
  cookie.push('USERID=' + user_id)
  cookie.push('TOKEN=' + token)
  cookie.push('device=' + 1)
  cookie.push('app_name=' + 1)
  cookie.push('app_version=' + ENV_VERSION)
  cookie.push('channel=' + 1)
  header.cookie = cookie.join('; ')
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL_PATH + path,
      header: header,
      method: method,
      data: data,
      success: function (res) {
        console.log(res)
        if (res.statusCode !== 200) {
          reject(res.data)
        } else {
          // if (res.data.code === 20006) {
          //   login().then((res) => {
          //     resolve(res)
          //   }).catch((errMsg) => {
          //     reject(errMsg)
          //   })
          // }
          resolve(res.data)
        }
      },
      fail: function (res) {
        reject(res)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

export function post (obj) {
  return request(obj.url, 'post', obj.data)
}

export function get (url, data) {
  return request(url, 'get', data)
}

export default {
  request, post, get
}
