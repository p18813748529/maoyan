<template>
    <nav class="tabs">
        <slot/>
    </nav>
</template>

<script>
import {mapState} from "vuex";
export default {
    name: "tabs",
    // computed: {
    //     pagePath(){
    //         return this.$route.path;
    //     }
    // },
    // watch: {
    //     pagePath(){
    //         console.log(this.pagePath);
    //         this.handleTabAction2('a');
    //     }
    // },
    methods: {
        handleTabAction(text){
            // console.log(text)
            let vnode = this.$slots.default;
            let coms = vnode.map(item=>{
                return item.componentInstance;
            });
            // console.log(1,vnode[0].componentInstance)
            // console.log(1,vnode[0])
            coms.map((item,index)=>{
                item.isActive = false;
                if(item.text == text){
                    this.$emit("handleTabAcction",index);
                }
            });
        },
        handleTabAction2(text){
            console.log(text)
            let vnode = this.$slots.default;
            let coms = vnode.map(item=>{
                return item.componentInstance;
            });
            console.log(2,vnode[0])
        },
    },
}
</script>

<style lang="scss" scoped>
.tabs{
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 49px;
  border-top: 1px solid #d8d8d8;
}
</style>
