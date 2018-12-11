<template>
    <div class="header">
        <div class="left">
            <slot name='left'/>
        </div>
        <p class="title">{{title}}</p>
        <div class="right">
            <slot name='right'/>
        </div>
    </div>
</template>

<script>
export default {
    name: "app-header",
    props: {
        title: String
    }
}
</script>

<style lang="scss" scoped>
.header{
    height: 50px;
    background: #e54847;
    color: #fff;
    .title{
        text-align: center;
        line-height: 50px;
        font-size: 18px;
    }
    .left,.right{
        position: absolute;
        top: 0;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .left{
        left: 0;
    }
    .right{
        right: 0;
    }
}
</style>
