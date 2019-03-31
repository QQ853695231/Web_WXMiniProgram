<template>
    <div>
      <div v-show="current === 'homepage'">homepage</div>
      <div v-show="current === 'group'">group</div>
      <div v-show="current === 'remind'">remind</div>
      <div v-show="current === 'mine'">mine</div>
      <i-tab-bar :current="current" color="#f759ab"  @change="handleChange"  fixed>
        <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
        <i-tab-bar-item key="group" icon="group" current-icon="group_fill" title="朋友"></i-tab-bar-item>
        <i-tab-bar-item key="remind" icon="remind" current-icon="remind_fill" title="通知"></i-tab-bar-item>
        <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
      </i-tab-bar>
      <i-toast id="toast" />
      <i-spin size="large" fix v-if="spinShow"/>
  </div>
</template>

<script>
  import card from '@/components/card'
  import loginPlatformAfterWxLogin from '../../api/user/User'
  import {$Toast} from '../../../static/iview/base/index';

  export default {
    data () {
      return {
        motto: 'Hello miniprograme',
        spinShow: false,
        current: 'homepage',
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
      handleChange(e) {
        this.current = e.mp.detail.key
      },
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
            that.spinShow = true
            loginPlatformAfterWxLogin(res.code).then(res => {
              if (res.status === 111) {
                $Toast({
                  content: '请先完善个人信息',
                  type: 'success',
                  icon: 'success_fill',
                  duration: 2
                })

                setTimeout(() => {
                  mpvue.navigateTo({ url: '../personal/main' })
                }, 2000)

              } else {

                mpvue.navigateTo({ url: '../logs/main' })
              }
            })
          },
          fail (res) {
            console.log(res)
          },
          complete (res) {
            that.spinShow = false
          }
        })
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
