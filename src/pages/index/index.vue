<template>
    <div>
      <i-button type="info">33333</i-button>
      <i-row>
        <i-col span="8" i-class="col-class">col-8</i-col>
        <i-col span="8" i-class="col-class">col-8</i-col>
        <i-col span="8" i-class="col-class">col-8</i-col>
      </i-row>

      <i-spin size="large" fix v-if="spinShow"></i-spin>
  </div>
</template>

<script>
  import card from '@/components/card'
  import loginPlatformAfterWxLogin from '../../api/user/User'

  export default {
    data () {
      return {
        motto: 'Hello miniprograme',
        spinShow: false,
        userInfo: {
          nickName: 'mpvue',
          avatarUrl: 'http://mpvue.com/assets/logo.png'
        }
      }
    },

    components: {
      card
    },

    methods: {
      bindViewTap () {
        const url = '../logs/main'
        if (mpvuePlatform === 'wx') {
          mpvue.switchTab({url})
        } else {
          mpvue.navigateTo({url})
        }
      },
      login () {
        const that = this
        this.spinShow = true
        wx.login({
          success (res) {
            // console.log(res)
            that.spinShow = true
            loginPlatformAfterWxLogin(res.code).then(res => {
              console.log(res)
            })
          },
          fail (res) {
            console.log(res)
          },
          complete (res) {
            that.spinShow = false
          }
        })
        // mpvue.navigateTo({ url: '../personal/main' })
        // throw {message: 'custom test'}
      }
    },

    created () {
      // let app = getApp()
    },
    onLoad () {
        this.login()
        console.log(this.$wxRequest)
    }
  }
</script>

<style scoped>
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
  }

  .userinfo-nickname {
    color: #aaa;
  }

  .usermotto {
    margin-top: 150px;
  }

  .form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
  }

  .all {
    width: 7.5rem;
    height: 1rem;
    background-color: blue;
  }

  .all:after {
    display: block;
    content: '';
    clear: both;
  }

  .left {
    float: left;
    width: 3rem;
    height: 1rem;
    background-color: red;
  }

  .right {
    float: left;
    width: 4.5rem;
    height: 1rem;
    background-color: green;
  }
</style>
