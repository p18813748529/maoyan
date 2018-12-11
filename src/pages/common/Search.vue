<template>
    <div class="page subpage" id="search">
        <app-header title="猫眼电影">
            <span slot="left" class="back" @click="backAction">&lt;</span>
        </app-header>
        <div class="search-wrap">
            <div class="search-inp">
                <i class="icon"></i>
                <input class="inp" type="text" placeholder="搜电影、搜影院" v-if="type=='movie'"
                    @input="searchAction(-1)" ref="m-inp">
                <input class="inp" type="text" placeholder="搜影院" v-if="type=='cinema'" 
                    @input="searchAction(2)" ref="c-inp">
            </div>
            <div class="cancel" @click="backAction">取消</div>
        </div>
        <div class="hot-search" v-if="!movieList.list.length>0&&!cinemaList.list.length>0">
            <h3>热门搜索</h3>
            <div class="hot-movies-wrap"></div>
        </div>
        <div class="movie-list">
            <movie-item v-for="movie in movieList.list" :key="movie.id" :movie="movie"></movie-item>
        </div>
        <ul class="cinema-list">
            <li class="cine-item" v-for="cine in cinemaList.list" :key="cine.id" @click="toCinemaDetail(cine.id)">
                <p class="title">
                    <span class="nm">{{cine.nm}}</span>
                    <span class="price"><span class="mark">{{cine.sellPrice}}</span>元起</span>
                </p>
                <p class="loc">
                    <span class="addr">{{cine.addr}}</span>
                    <span class="distance">{{cine.distance}}</span>
                </p>
                <!-- 标签 -->
                <p class="label">
                    <i class="allowRefund" v-if="cine.allowRefund">退</i>
                    <i class="endorse" v-if="cine.endorse">改签</i>
                    <i class="snack" v-if="cine.snack">小吃</i>
                    <i class="vipTag" v-if="cine.vipTag">{{cine.vipTag}}</i>
                    <i class="hall" v-for="(type,index) in cine.hallType" :key="index">
                        {{type}}
                    </i>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import {getSearchData} from "../../services/appService"
import MovieItem from "../../components/movie/MovieItem"
export default {
    components: {
        "movie-item": MovieItem,
    },
    props: ["type"],
    data(){
        return {
            cityId: this.$store.state.cityId,
            movieList: {list: []},
            cinemaList: {list: []},
            statusList: ['想看','','购票','预售']
        }
    },
    methods: {
        backAction(){
            this.$router.back();
        },
        searchAction(stype){
            // 清除延时器
            clearTimeout(this.timer);
            // 设置延时器，200ms后如果没有继续输入就请求数据
            this.timer = setTimeout(()=>{
                let kw;
                if(stype==-1){
                    // 请求电影数据和影院数据
                    kw = this.$refs["m-inp"].value;
                    if(kw){
                        getSearchData(kw,this.cityId,-1)
                        .then(data=>{
                            if(data.cinemas){
                                this.cinemaList = data.cinemas;
                            }
                            this.movieList = data.movies;
                            this.movieList.list = this.movieList.list.map(item=>{
                                item.showst = this.statusList[item.showst];
                                return item;
                            });
                        });
                    }else{
                        this.cinemaList = {list: []};
                        this.movieList = {list: []};
                    }
                }else if(stype==2){
                    // 请求影院数据
                    kw = this.$refs["c-inp"].value;
                    if(kw){
                        getSearchData(kw,this.cityId,2)
                        .then(data=>{
                            if(data.cinemas){
                                this.cinemaList = data.cinemas;
                            }
                        });
                    }else{
                        this.cinemaList = {list: []};
                        this.movieList = {list: []};
                    }
                }
            },300)
        }
    },
    deactivated(){
        this.$destroy();
    }
}
</script>

<style lang='scss' scoped>
#search{
    background: #F5F5F5;
    .back{
        padding: 10px;
    }
    .search-wrap{
        display: flex;
        padding: 10px;
        .search-inp{
            display: flex;
            padding: 0 10px;
            border: 1px solid #e6e6e6;
            border-radius: 5px;
            background-color: #fff;
            flex: 1;
            align-items: center;
            .inp{
                flex: 1;
                border: none;
                font-size: 13px;
                color: #333;
                line-height: 20px;
                padding: 4px 0;
                outline: none
            }
            .icon{
                width: 14px;
                height: 14px;
                margin: 0 4px 3px 0;
                background: url(../../assets/search-gray.png);
                background-size: cover;
            }
        }
        .cancel{
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            font-size: 16px;
            color: #f03d37;
        }
    }
    .hot-search{
        padding: 0 0 8px 15px;
        background-color: #fff;
        top: -1px;
        border-top: 1px solid #e5e5e5;
        h3{
            padding: 17px 0;
            font-size: 15px;
            font-weight: normal;
            color: #666;
        }
    }
    .cinema-list{
        background: #fff;
        .cine-item{
            border-bottom: 1px solid #eee;
            padding: 13px 15px 13px 0;
            margin: 0 15px;
            background-color: #fff;
            .title{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 25px;
                .nm{
                    color: #333;
                    font-size: 16px;
                }
                .price{
                    color: #f03d37;
                    font-size: 10px;
                    margin-left: 8px;
                    .mark{
                        font-size: 18px;
                        margin-right: 3px;
                    }
                }
            }
            .loc{
                font-size: 12px;
                color: #666;
                line-height: 15px;
                .addr{
                    display: inline-block;
                    width: 80%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .distance{
                    float: right;
                }
            }
            .label{
                display: flex;
                padding: 5px 0;
                i{
                    margin-right: 5px;
                    position: relative;
                    padding: 0 3px;
                    height: 15px;
                    line-height: 15px;
                    border-radius: 2px;
                    font-size: .6rem;
                    border: 1px solid transparent;
                }
                .allowRefund,.endorse,.hall{
                    color: #589daf;
                    border-color: #589daf;
                }
                .snack,.vipTag{
                    color: #f90;
                    border-color: #f90;
                }
            }
            .tag{
                font-size: 12px;
                color: #999;
                display: flex;
                align-items: center;
                .icon{
                    width: 15px;
                    height: 15px;
                    background: url("../../assets/card.png");
                    background-size: cover;
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>
