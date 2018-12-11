<template>
  <div id="app">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <tabs @handleTabAcction = "handleTabAcction">
          <tab-item v-for="(tabItem,index) in tabList" :key="index" :text="tabItem.name" :path="tabItem.path"></tab-item>
      </tabs>
  </div>
</template>
<script>
import {getCityList} from "./services/movieService"
export default {
  data(){
    return {
      tabList: [
        {name: "电影", pathName: "movie", path: "/movie"},
        {name: "影院", pathName: "cinema", path: "/cinema"},
        {name: "我的", pathName: "mine", path: "/mine"},
      ]
    }
  },
  methods: {
    handleTabAcction(index){
      this.$router.push({name: this.tabList[index].pathName});
    },
  }
}
</script>
<style lang="scss">
.page{
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 49px;
  &.subpage{
    bottom: 0;
    z-index: 5;
  }
}

</style>
