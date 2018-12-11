<template>
    <div class="page subpage" id="cinema-detail">
        <app-content>
            <div class="wrap" v-show="cinemaDetail.cinemaData">
                <app-header title="猫眼电影">
                    <span slot="left" class="back" @click="backAction">&lt;</span>
                </app-header>
                <div class="cinema-wrap">
                    <div class="cinema-info">
                        <p class="title line-ellipsis">{{cinemaData.nm}}</p>
                        <p class="location line-ellipsis">{{cinemaData.addr}}</p>
                    </div>
                    <div class="location-icon" data-bid="dp_wx_cinema_map">
                        <img src="../../assets/loc.png">
                    </div>
                </div>
                <div class="cinema-nav">
                    <div class="post-bg"></div>
                    <div class="post-bg-filter"></div>
                    <scroll>
                        <div class="movie-show" v-for="(movie,index) in movies" :key="index"
                            @click="selectMovie(index)" :class="{active: isActive==index}">
                            <img :src="movie.img | replaceSrc(0,95)" alt="">
                        </div>
                    </scroll>
                </div>
                <div class="movie-info">
                    <div class="movie-title line-ellipsis">
                        <span class="title">{{showMovie.nm}}</span>
                        <span class="grade">
                            <span v-if="showMovie.sc>0">{{showMovie.sc}}<span class="small">分</span></span>
                            <span v-if="showMovie.sc<=0">暂无评分</span>
                        </span>
                    </div>
                    <div class="movie-desc line-ellipsis">{{showMovie.desc}}</div>
                </div>
                <div class="showDays">
                    <ul id="timeline" class="mb-line-b">
                        <li v-for="(day,index) in showMovie.shows" :key="index" :data-day="day.dateShow" 
                            class="showDay" :class="{active: dateActive==index}" 
                            @click="dateActiveAction(index)">
                            {{day.dateShow}}
                        </li>
                    </ul>
                </div>
                <div class="vip-tips">
                    <a>
                        <div class="label">折扣卡</div>
                        <div class="label-text line-ellipsis">购票享低价，首单2张立减3元</div> 	
                        <div class="process">9.9元开卡</div>
                    </a>
                </div>
                <div class="show-wrap">
                    <show-list :plist="show.plist" :times="showMovie.dur"></show-list>
                </div>
                <div class="tuan-wrap">
                    <tuan-list :tuanList="dealList"></tuan-list>
                </div>
            </div>
        </app-content>
    </div>
</template>

<script>
import {getCinemaDetail} from "../../services/cinemaService"
import ShowCinemaList from "../../components/cinema/ShowCinemaList"
import TuanList from "../../components/cinema/TuanList"
export default {
    components: {
        "show-list": ShowCinemaList,
        "tuan-list": TuanList
    },
    props: ["cineId"],
    data(){
        return {
            cinemaDetail: {},
            cinemaData: {},
            dealList: {},
            movies: {},
            vipInfo: {},
            showMovie: {},
            show: {},
            dateActive: 0,
            isActive: 0
        }
    },
    watch: {
        showMovie(){
            this.show = this.showMovie.shows[0];
        }
    },
    created(){
        getCinemaDetail(this.cineId)
        .then(cinemaDetail=>{
            this.cinemaDetail = cinemaDetail;
            console.log(this.cinemaDetail)
            this.cinemaData = cinemaDetail.cinemaData;
            this.dealList = cinemaDetail.dealList;
            this.movies = cinemaDetail.movies;
            this.vipInfo = cinemaDetail.vipInfo;
            this.showMovie = this.movies[0];
            this.show = this.showMovie.shows[0];
        });
    },
    methods: {
        backAction(){
            this.$router.back();
        },
        // 切换时间
        dateActiveAction(index){
            // 选择的时间为激活状态
            this.dateActive = index;
            // 切换显示选泽的时间的数据
            this.show = this.showMovie.shows[index];
        },
        selectMovie(index){
            this.isActive = index;
            this.showMovie = this.movies[index];
        }
    },
    deactivated(){
        this.$destroy();
    },
}
</script>

<style lang="scss" scoped>
#cinema-detail{
    background: #fff;
    .back{
        padding: 10px;
    }
    .cinema-wrap{
        position: relative;
        padding: 15px 100px 15px 15px;
        .cinema-info{
            .title{
                font-size: 17px;
                line-height: 24px;
                font-weight: 700;
                color: #333;
            }
            .location{
                margin-top: 2px;
                font-size: 13px;
                line-height: 18.5px;
                color: #999;
            }
        }
        .location-icon{
            position: absolute;
            right: 0;
            top: 50%;
            width: 70px;
            height: 31px;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            border-left: 1px solid #d8d8d8;
            text-align: center;
            img{
                display: inline-block;
                width: 19px;
                height: 22px;
                margin-top: 5px;
            }
        }
    }
    .movie-info{
        padding: 11px 15px;
        text-align: center;
        .movie-title{
            height: 24px;
            line-height: 24px;
            font-size: 17px;
            color: #333;
            font-weight: 700;
            .title{
                line-height: 24px;
                font-size: 17px;
                color: #333;
                font-weight: 700;
            }
            .grade{
                color: #ffb400;
                font-size: 16px;
                padding-left: 5px;
                .small{
                    font-size: 10px;
                }
            }
        }
        .movie-desc{
            margin-top: 2px;
            height: 18.5px;
            line-height: 18.5px;
            font-size: 13px;
            color: #999;
        }
    }
    .vip-tips{
        background-color: #fff5ea;
        padding: 0 15px;
        height: 42px;
        line-height: 42px;
        display: flex;
        color: #777;
        a{
            flex: 1;
            display: flex;
            color: #777;
        }
        .label{
            display: inline-block;
            background-color: #ff941a;
            border-radius: 2px;
            font-size: 10px;
            line-height: 15px;
            height: 15px;
            width: 34px;
            text-align: center;
            color: #fff;
            margin-top: 13px;
            margin-right: 10px;
        }
        .label-text{
            color: #fa9600;
            font-size: 12px;
            flex: 1;
        }
        .process{
            flex: 0 0 auto;
            line-height: 42px;
            color: #999;
            font-size: 12px;
            &::after{
                display: inline-block;
                content: "";
                width: 7px;
                height: 7px;
                border-left: 1px solid #ccc;
                border-top: 1px solid #ccc;
                transform: rotate(135deg);
            }
        }
    }
    .showDays{
        width: 100%;
        background-color: #fff;
        overflow-x: scroll;
        height: 45px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        #timeline{
            padding: 0;
            margin: 0;
            white-space: nowrap;
            li{
                position: relative;
                display: inline-block;
                width: 115px;
                line-height: 43px;
                margin-left: 4.5px;
                font-size: 14px;
                text-align: center;
                list-style: none;
                color: #666;
                &.active{
                    border-bottom: 2px solid #f03d37;
                    color: #f03d37;
                }
            }
        }
    }
    .cinema-nav{
        padding: 20px 15px 20px 5px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        z-index: 1;
        .post-bg{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -2;
            overflow: hidden;
            -webkit-filter: blur(30px);
            filter: blur(30px);
            background-position-y: 40%;
            background-image: url(http://p0.meituan.net/148.208/movie/363e3a7e614d29b2847ff4e62afcd3f42168651.jpg);
        }
        .post-bg-filter{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: #40454d;
            opacity: .55;
            z-index: -1;
        }
        .movie-show{
            margin: 5px;
            border: 2px solid transparent;
            &.active{
                transform: scale(1.1);
                border-color: #fff;
            }
            img{
                height: 95;
                display: block;
            }
        }
    }
}
</style>
