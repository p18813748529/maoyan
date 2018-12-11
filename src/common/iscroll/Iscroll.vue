<template>
<div class="scroll" ref="scroll">
    <div class="wrap" :style="{width: wrapWidth}">
        <slot/>
    </div>
</div>
</template>

<script>
export default {
    name: 'scroll',
    props: {
        canLoadMore: Boolean
    },
    data(){
        return {
            wrapWidth: 0
        }
    },
    mounted(){
        this.scroll = new IScroll(this.$refs.scroll, {
            scrollX: true
        });
        this.scroll.on('beforeScrollStart', ()=>{
            let width = 0;
            this.$slots.default.map(item=>{
                width += item.elm.offsetWidth;
            })
            this.wrapWidth = width + 'px';
            this.$nextTick(()=>{
                this.scroll.refresh();
            })
        });
        this.scroll.on('scrollEnd', ()=>{
            if(this.scroll.x <= this.scroll.maxScrollX && this.canLoadMore){
                this.$emit("loadmoreExpect");
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.scroll{
    overflow: hidden;
    white-space: nowrap;
    .wrap{
        display: flex;
    }
}
</style>

