<template>
    <div class="page" id="mine">
        <app-header title="我的"></app-header>
        <div class="btn-wrap">
            <button class="btn can-sub" @click="logOutAction">退出</button>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
    methods: {
        logOutAction(){
            localStorage.removeItem("token");
            this.$router.push("/login");
        },
        ...mapActions(["setPath"]),
        
    },
    activated(){
        this.setPath(this.$route.path);
    }
}
</script>

<style lang="scss" scoped>
#mine{
    z-index: 5;
    .btn-wrap{
        margin-top: 10px;
        font-size: 20px;
        color: #333;
        display: flex;
        .btn{
            flex: 1;
            text-align: center;
            height: 40px;
            border-radius: 5px;
            outline: none;
            border: none;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            &.can-sub{
                background-color: #df2d2d;
            }
        }
    }
}
</style>
