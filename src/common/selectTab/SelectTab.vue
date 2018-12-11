<template>
    <div class="select-tab" ref="select-tab" :style="{posStyle: isPos}" v-if="brand.length>0">
        <div class="item-wrap">
            <div class="item" @click="selectFilter('district')" 
                :class="{active: filterText=='district'||filterText=='subway'}">
                <span class="text">全城</span>
                <span class="icon"></span>
            </div>
            <div class="item" @click="selectFilter('brand')" :class="{active: filterText=='brand'}">
                <span class="text">品牌</span>
                <span class="icon"></span>
            </div>
            <div class="item" @click="selectFilter('service')" :class="{active: filterText=='service'}">
                <span class="text">特色</span>
                <span class="icon"></span>
            </div>
        </div>
        <div class="filter-wrap">
            <div class="district-subway clear-fix" v-if="filterText=='district'||filterText=='subway'">
                <ul class="select-nav">
                    <li :class="{active: filterText=='district'}"
                        @click="selectFilter('district')">商区</li>
                    <li :class="{active: filterText=='subway'}"
                        @click="selectFilter('subway')">地铁站</li>
                </ul>
                <div class="select-con">
                    <ul class="district" v-if="filterText=='district'">
                        <li v-for="(item,index) in district" :key="item.id" class="select-item"
                            :class="{active: districtId==item.id}" @click="selectFilterAction('districtId',item.id,false,index)">
                            {{item.name}}({{item.count}})
                        </li>
                    </ul>
                    <ul class="subway" v-if="filterText=='subway'">
                        <li v-for="(item,index) in subway" :key="item.id" class="select-item"
                            :class="{active: subwayId==item.id}" @click="selectFilterAction('subwayId',item.id,false,index)">
                            {{item.name}}({{item.count}})
                        </li>
                    </ul>
                    <div class="show-con">
                        <div v-for="item in districtSubwayCon" :key="item.id" class="con-item"
                            :class="{active: districtSubwayConId==item.id}"
                            @click="selectFilterAction('districtSubwayConId',item.id)">
                            <span class="item-name">{{item.name}}</span>
                            <span class="item-count">{{item.count}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="brand" v-if="filterText=='brand'">
                <app-content ref="content" :style="{top: '40px', bottom: '-300px', background: '#fff'}">
                    <ul class="brand-list">
                        <li v-for="item in brand" :key="item.id" :class="{active: brandId==item.id}"
                            @click="selectFilterAction('brandId',item.id)">
                            <span class="name">{{item.name}}</span>
                            <span class="count">{{item.count}}</span>
                        </li>
                    </ul>
                </app-content>
            </div>
            <div class="service-hallType" v-if="filterText=='service'">
                <p class="item-title">特色功能</p>
                <ul class="list-wrap">
                    <li v-for="item in service" :key="item.id" :class="{active: serviceId==item.id}"
                        @click="selectFilterAction('serviceId',item.id)">
                        {{item.name}}
                    </li>
                </ul>
                <p class="item-title">特殊厅</p>
                <ul class="list-wrap">
                    <li v-for="item in hallType" :key="item.id" :class="{active: hallTypeId==item.id}"
                        @click="selectFilterAction('hallTypeId',item.id)">
                        {{item.name}}
                    </li>
                </ul>
                <div id="special-btn">
                    <span class="btn" id="cancel-btn" >重置</span>
                    <span class="btn" id="confirm-btn">确定</span>
                </div>
            </div>
        </div>
        <div class="mask" v-show="isMack"></div>
    </div>
</template>
<script>
import {mapState} from "vuex"
import {getFilterCinemas} from "../../services/cinemaService"
export default {
    name: "select-tab",
    props: ["selectCall"],
    data(){
        return {
            brand: [],
            district: [],
            hallType: [],
            service: [],
            subway: [],
            timeRanges: [],
            filterText: "",
            districtId: -1,
            subwayId: -1,
            brandId: -1,
            serviceId: -1,
            hallTypeId: -1,
            districtSubwayCon: null,
            districtSubwayConId: -1,
            isPos: false,
            isMack: false
        }
    },
    computed: {
        ...mapState(["cityId","city"]),
    },
    created(){
        getFilterCinemas(this.cityId)
        .then((data)=>{
            this.brand = data.brand.subItems;
            this.district = data.district.subItems;
            this.hallType = data.hallType.subItems;
            this.service = data.service.subItems;
            this.subway = data.subway.subItems;
            this.timeRanges = data.timeRanges.subItems;
        });
    },
    methods: {
        // 切换过滤模块
        selectFilter(filterText){
            if(filterText=="district"||filterText=="subway"){
                this.districtSubwayCon = [];
                this.subwayId = -1;
                this.districtId = -1;
            }
            if(this.filterText == filterText){
                // 点击已展开的模块，就是关闭
                this.filterText = "";
                // 并且将整个模块恢复到原来的位置，调用外部的回调函数
                if(this.selectCall){
                    this.selectCall(false);
                }
                this.isMack = false;
            }else{
                // 点击未展开的模块，就展开选择的模块
                this.filterText = filterText;
                // 并且将整个模块固定到指定位置，调用外部的回调函数
                if(this.selectCall){
                    this.selectCall(true);
                }
                this.isMack = true;
            }
        },
        // 选择过滤条件
        selectFilterAction(type,id,isSend,index){
            if(type=="districtId"||type=="subwayId"){
                this.districtSubwayCon = this[type.replace("Id","")][index].subItems;
            }
            this[type] = id;
            if(isSend){
                // 如果为true就发送请求
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.select-tab{
    position: relative;
    width: 100%;
    z-index: 10;
    color: #777;
    background: url(../../assets/bg-bottom.png) 0 bottom repeat-x;
    background-color: #fff;
    .item-wrap{
        display: flex;
        border-bottom: 1px solid #eee;
        background: #fff;
        .item{
            flex: 1;
            text-align: center;
            line-height: 40px;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            font-size: 13px;
            text-overflow: ellipsis;
            &.active{
                color: #e54847;
                .icon{
                    transform: rotate(180deg);
                    top: 15px;
                    border-top-color: #e54847;
                }
            }
            &:before{
                content: "";
                display: block;
                position: absolute;
                height: 20px;
                top: 10px;
                left: 0;
                border-left: 1px solid #e8e8e8;
            }
            .icon{
                display: inline-block;
                position: absolute;
                top: 18px;
                width: 0;
                height: 0;
                margin-left: 4px;
                border: 4px solid transparent;
                border-top-color: #b0b0b0;
            }
        }
    }
    .filter-wrap{
        background-color: #fff;
        .item-title{
            margin-left: 12px;
            padding-top: 11px;
            font-size: 15px;
        }
        .district-subway{
            background: #fff;
            .select-nav{
                display: flex;
                li{
                    font-size: 14px;
                    flex: 1;
                    padding: 0 10px;
                    line-height: 44px;
                    text-align: center;
                    position: relative;
                    &.active{
                        color: #f03d37;
                        &:after{
                            content: "";
                            position: absolute;
                            display: block;
                            bottom: 0;
                            left: 10px;
                            width: 90%;
                            border-top: 2px solid #f03d37;
                        }
                    }
                }
            }
            .select-con{
                height: 480px;
                background: #f5f5f5;
                .district,.subway{
                    height: 100%;
                    width: 35%;
                    float: left;
                    overflow: scroll;
                    background: #fff;
                }
                .select-item{
                    height: 44px;
                    padding-left: 10px;
                    line-height: 44px;
                    font-size: 14px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    &.active{
                        color: #f03d37;
                        background: #f5f5f5;
                    }
                }
                .show-con{
                    width: 65%;
                    height: 100%;
                    float: right;
                    overflow: scroll;
                    .con-item{
                        margin-left: 10px;
                        position: relative;
                        height: 45px;
                        line-height: 45px;
                        padding: 0 0 0 25px;
                        display: flex;
                        &.active{
                            &::before{
                                content: "";
                                display: block;
                                position: absolute;
                                left: 8px;
                                top: 19px;
                                width: 11.5px;
                                height: 8px;
                                background-image: url("../../assets/gou.png");
                                background-repeat: no-repeat;
                                background-size: 100% 100%;
                            }
                            span{
                                color: #f03d37;
                            }
                        }
                        .item-name{
                            width: 80%;
                            font-size: 14px;
                            color: #333;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                        .item-count{
                                float: right;
                                width: 20px;
                                margin-right: 10px;
                                color: #8f9296;
                                font-size: 12px;
                                text-align: right;
                        }
                    }
                }
            }
        }
        .brand{
            .brand-list{
                li{
                    font-size: 14px;
                    position: relative;
                    line-height: 44px;
                    height: 44px;
                    padding: 0 26px;
                    border-bottom: 1px solid #e5e5e5;
                    color: #333;
                    display: flex;
                    &.active{
                        span{
                            color: #dd403b;
                            &.count{
                                color: #dd403b;
                            }
                        }
                    }
                    span{
                        flex: 1;
                        &.count{
                            text-align: right;
                            color: #8f9296;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
        .list-wrap{
            margin: 0 12px 12px;
            &::after{
                content: "";
                clear: both;
                overflow: hidden;
                display: block;
                visibility: hidden;
                height: 0;
            }
            li{
                float: left;
                width: 21.3%;
                height: 30px;
                padding: 3px 0;
                margin-right: 3%;
                margin-top: 10px;
                line-height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: .7rem;
                &.active{
                    background: #fcf0f0;
                    color: #f03d37;
                    border: 1px solid #f03d37;
                }
            }
        }
        #special-btn{
            height: 60px;
            width: 100%;
            border-top: 1px solid #e5e5e5;
            margin-top: 10px;
            background: #fafafa;
            .btn{
                display: inline-block;
                height: 34px;
                width: 21.3%;
                margin: 13px 11px;
                border: 1px solid #e5e5e5;
                border-radius: 6px;
                text-align: center;
                line-height: 34px;
                font-size: 14px;
            }
            #confirm-btn{
                float: right;
                background: #f03d37;
                border: 1px solid #f03d37;
                color: #fff;
            }
        }
    }
    .mask{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        top: 0;
        background: rgba($color: #000000, $alpha: .3);
        z-index: -1;
    }
}
</style>
