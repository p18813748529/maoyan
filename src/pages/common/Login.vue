<template>
    <div class="page" id="login">
        <app-header title="猫眼电影">
            <span slot="left" class="back" @click="backAction">&lt;</span>
        </app-header>
        <div class="nav-wrap">
            <ul class="nav">
                <li :class="{active: selectIndex==0}"><a href="javascript:" @click="selectLoginType(0)">美团账号登录</a></li>
                <li :class="{active: selectIndex==1}"><a href="javascript:" @click="selectLoginType(1)">手机验证登录</a></li>
                <div class="active-border" :class="{one: selectIndex==0,tow: selectIndex==1}"></div>
            </ul>
        </div>
        <div class="form-wrap">
            <div v-show="selectIndex==0" class="form account-from">
                <div class="inp-wrap">
                    <input type="text" placeholder="账户名/手机号/Email" ref="user">
                </div>
                <div class="inp-wrap">
                    <input type="password" placeholder="请输入您的密码" ref="pass">
                </div>
                <div class="btn-wrap">
                    <button class="btn can-sub" @click="subAction">登录</button>
                </div>
            </div>
            <div v-show="selectIndex==1" class="form phone-from">
                <div class="inp-wrap">
                    <input type="text" placeholder="请输入手机号">
                </div>
                <div class="inp-wrap">
                    <input type="text" placeholder="请输入短信验证码">
                </div>
                <div class="btn-wrap">
                    <button class="btn">登录</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            selectIndex: 0
        }
    },
    methods: {
        selectLoginType(index){
            this.selectIndex = index;
        },
        backAction(){
            this.$router.replace("/movie");
        },
        subAction(){
            let userInfo = this.$refs.user.value;
            this.$refs.user.value = '';
            this.$refs.pass.value = '';
            localStorage.setItem("token",userInfo);
            this.$router.replace({name: "mine"});
        }
    },
}
</script>

<style lang="scss" scoped>
#login{
    background: #fff;
    bottom: 0;
    z-index: 10;
    .back{
        padding: 10px;
    }
    .nav-wrap{
        background: #fff;
        padding: 0 10px;
        border-bottom: 4px solid #d6d6d6;
        .nav{
            position: relative;
            display: flex;
            position: relative;
            font-size: 14px;
            color: #333;
            li{
                flex: 1;
                text-align: center;
                &.active{
                    a{
                        color: #df2d2d;
                    }
                }
                a{
                    padding: 12px 0 9px;
                    display: block;
                }
            }
            .active-border{
                width: 50%;
                height: 4px;
                background: #df2d2d;
                position: absolute;
                bottom: -4px;
                transition: .2s;
                &.one{
                    transform: translateX(0)
                }
                &.tow{
                    transform: translateX(100%)
                }
            }
        }
    }
    .form-wrap{
        padding: 0 10px;
        .inp-wrap{
            padding: 2px 0;
            border-bottom: 1px solid #d6d6d6;
            display: flex;
            input{
                flex: 1;
                border: 0;
                margin: 5px;
                line-height: 20px;
                font-size: 16px;
                border-radius: 3px;
                outline: none;
                padding: 5px;
                &:focus{
                    background: #eee;
                }
            }
        }
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
                cursor: not-allowed;
                &.can-sub{
                    background-color: #df2d2d;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
