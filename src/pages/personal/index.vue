<template>
  <div class="counter-warp">
    <i-row>
      <i-col span="24" i-class="col-class">
        <i-input v-model="name" title="名字"></i-input>
      </i-col>
      <i-col span="24" i-class="col-class">
        <i-input v-model="age" title="年龄"></i-input>
      </i-col>
      <i-col span="24" i-class="col-class">
        <i-input v-model="address" title="地址" ></i-input>
      </i-col>
    </i-row>
  </div>
</template>

<script>
  // Use Vuex
  import store from './store'

  export default {
    data () {
      return {name: '', age: '', address: ''}
    },
    computed: {
      count () {
        return store.state.count
      }
    },
    methods: {
      increment () {
        store.commit('increment')
      },
      decrement () {
        store.commit('decrement')
      }
    }
  }
</script>

<style>
  .counter-warp {
    text-align: center;
    margin-top: 100px;
  }

  .home {
    display: inline-block;
    margin: 100px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }
</style>
