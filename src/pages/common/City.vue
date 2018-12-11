<template>
<div id="city">
    <app-content :style="{top: 0, bottom: 0}" ref="content">
        <div id="city-wrap">
            <div class="location-city" ref="loc">
                <p class="tip">定位城市</p>
                <div class="con">
                    <span @click="selectCityAction({nm: '深圳', id: 30})">按钮</span>
                </div>
            </div>
            <div class="recent-city" ref=rec>
                <p class="tip">最近访问城市</p>
                <div class="con">
                    <span @click="selectCityAction({nm: '深圳', id: 30})">按钮</span>
                    <span @click="selectCityAction({nm: '深圳', id: 30})">按钮</span>
                    <span @click="selectCityAction({nm: '深圳', id: 30})">按钮</span>
                </div>
            </div>
            <div class="hot-city" ref="hot">
                <p class="tip">热门城市</p>
                <div class="con">
                    <span @click="selectCityAction({nm: '深圳', id: 30})">按钮</span>
                    <span @click="selectCityAction({nm: '深圳', id: 30})">按钮</span>
                    <span @click="selectCityAction({nm: '深圳', id: 30})">按钮</span>
                </div>
            </div>
            <div class="city-map" v-for="(citys,index) in cityList" :key="index" ref="list">
                <div class="city-title">{{keys[index].toUpperCase()}}</div>
                <div class="city-list item" v-for="city in citys" :key="city.id"
                    @click="selectCityAction(city)">
                    {{city.nm}}
                </div>
            </div>
        </div>
    </app-content>
    <div class="city-index">
        <span @click="toActionTow(0)">定位</span>
        <span @click="toActionTow(1)">最近</span>
        <span @click="toActionTow(2)">热门</span>
        <span v-for="(key,index) in keys" :key="index" @click="toAction(index)">
            {{key.toUpperCase()}}
        </span>
    </div>
</div>
</template>
<script>
import {mapActions} from "vuex"
import {getCityList} from "../../services/appService"
export default {
    data(){
        return {
            cityList: [],
            keys: []
        }
    },
    created(){
        // 如果本地存储中没有城市列表，就获取并添加到localStorage
        if(!localStorage.getItem("cityList")){
            getCityList()
            .then(({cityList,keys})=>{
                localStorage.setItem("cityList",JSON.stringify(cityList));
                localStorage.setItem("keys",JSON.stringify(keys));
                this.cityList = cityList;
                this.keys = keys;
            });
        }else{
            let cityList = JSON.parse(localStorage.getItem("cityList"));
            let keys = JSON.parse(localStorage.getItem("keys"));
            this.cityList = cityList;
            this.keys = keys;
        }
    },
    methods: {
        ...mapActions(["selectCity"]),
        // 将选择的城市存到全局数据
        selectCityAction(city){
            this.selectCity({city: city.nm,id: city.id});
            this.$router.back();
        },
        // 点击侧边栏索引，滚到对应的位置
        toAction(index){
            this.$refs.content.refresh();
            let height = 0;
            height += this.$refs.loc.offsetHeight;
            height += this.$refs.rec.offsetHeight;
            height += this.$refs.hot.offsetHeight;
            // 计算高度
            for(let i = 0; i < this.$refs.list.length; i++){
                if(i < index){
                    height += this.$refs.list[i].offsetHeight;
                }else{
                    break;
                }
            }
            //滚动
            this.$refs.content.scrollTo(0,-height,200);
        },
        toActionTow(index){
            let list = ['hot','rec','hot'];
            let height = 0;
            for(var i = 0; i < index; i++){
                height += this.$refs[list[i]].offsetHeight;
            }
            this.$refs.content.scrollTo(0,-height,200);
        }
    }
}
</script>
<style lang="scss" scoped>
#city{
    width: 100%;
    height: 100%;
    position: relative;
    .city-index{
        position: absolute;
        right: 0;
        top: 100px;
        font-size: 10px;
        color: #666;
        z-index: 5;
        span{
            display: block;
            text-align: center;
            padding: 2px;
        }
    }
    #city-wrap{
        background: #EBEBEB;
        font-size: 14px;
        .location-city,.recent-city,.hot-city{
            line-height: 30px;
            .tip{
                padding-left: 10px;
            }
            .con{
                padding: 10px 20px 10px 10px;
                background: #F5F5F5;
                span{
                    display: inline-block;
                    width: 29%;
                    height: 33px;
                    margin-top: 15px;
                    margin-right: 4%;
                    padding: 0 4px;
                    background: #fff;
                    border: 1px solid #e6e6e6;
                    border-radius: 3px;
                    line-height: 33px;
                    text-align: center;
                    box-sizing: border-box;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
        .city-map{
            background: #F5F5F5;
            margin-right: 20px;
            .city-title{
                background: #EBEBEB;
                padding-left: 25px;
                line-height: 35px;
                position: relative;
                top: -2px;
            }
            .item{
                height: 44px;
                line-height: 44px;
                margin-left: 15px;
                border-bottom: 1px solid #c8c7cc;
            }
        }
    }
}
</style>
