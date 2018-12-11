<template>
    <div class="content" ref="content">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "app-content",
    props: {
        canLoadMore: Boolean
    },
    methods: {
        // 刷新滚动视图的方法
        refresh(){
            this.contentScroll.refresh();
        },
        reset(){
            this.contentScroll.scrollTo(0, 0);
            this.contentScroll.refresh();
        },
        scrollTo(x,y,time){
            time = time || 0;
            this.contentScroll.scrollTo(x,y,time);
        }
    },
    mounted(){
        this.contentScroll = new IScroll(this.$refs.content, {
            
        })
        this.contentScroll.on('beforeScrollStart', ()=>{
            this.contentScroll.refresh();
        })
        this.contentScroll.on('scrollEnd', ()=>{
            if((this.contentScroll.y <= this.contentScroll.maxScrollY) && this.canLoadMore){
                this.$emit('loadmore');
            }
        })
    }
}
</script>
<style lang="scss" scoped>
.content{
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 5;
}
</style>
