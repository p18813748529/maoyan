<template>
    <li class="tab" @click="tabAction" :class="{active: isActive}">
        <span class="icon">*</span>
        <span class="text">{{text}}</span>
    </li>
</template>
<script>
export default {
    name: "tab-item",
    props: {
        text: String,
        path: String,
        icon: String
    },
    computed: {
        pagePath(){
            return this.$route.path;
        }
    },
    watch: {
        pagePath(){
            if(this.pagePath == this.path){
                this.tabAction();
            }
        }
    },
    data(){
        return {
            isActive: false
        }
    },
    methods: {
        tabAction(){
            this.$parent.handleTabAction(this.text);
            this.isActive = true;
        },
    },
    mounted(){
        if(this.pagePath == this.path){
            this.tabAction();
        }
    }
}
</script>

<style lang="scss" scoped>
.tab{
  flex: 1;
  text-align: center;
  color: #696969;
  display: flex;
  flex-direction: column;
  &.active{
    color: #f03d37;
  }
}
</style>
