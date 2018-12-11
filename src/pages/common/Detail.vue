<template>
    <app-content class="detail-wrap">
        <div>
            <div class="detail" v-if="movie">
                <app-header :title="movie.nm">
                    <span class="back" slot="left" @click="backAction">&lt;</span>
                </app-header>
                <div class="movie-detail" @click="movieLink">
                    <div class="movie-filter"></div>
                    <img class="movie-bg" :src="movie.img | replaceSrc(71,100)" alt="">
                    <div class="movie-con">
                        <div class="img">
                            <img :src="movie.img | replaceSrc(110,150)" alt="">
                        </div>
                        <div class="con">
                            <p class="nm line-ellipsis">{{movie.nm}}</p>
                            <p class="enm line-ellipsis">{{movie.enm}}</p>
                            <p class="sc-snum line-ellipsis" v-if="movie.sc>0">{{movie.sc}}<span>({{movie.snum}}万人评)</span></p>
                            <p class="sc-snum line-ellipsis" v-else>暂无评分</p>
                            <p class="cat-version line-ellipsis">{{movie.cat}}{{movie.version}}</p>
                            <p class="src-dur line-ellipsis">{{movie.src}}{{movie.dur}}</p>
                            <p class="pub line-ellipsis">{{movie.pubDesc}}</p>
                        </div>
                        <div class="arrow-g">
                            &gt;
                        </div>
                    </div>
                </div>
                <div class="day-tab" ref="day-tab">
                    <div class="showDays">
                        <ul id="timeline" class="mb-line-b">
                            <li v-for="(day,index) in dates" :key="index" :data-day="day.date" 
                                class="showDay" :class="{active: dateActive==index}" 
                                @click="dateActiveAction({index,date: day.date})">
                                {{day.date}}
                            </li>
                        </ul>
                    </div>
                    <select-tab :selectCall="handleSelectCall" ref="select-tab"></select-tab>
                </div>
            </div>
            <cinema-item :cinemas="cinemas"></cinema-item>
        </div>
    </app-content>
</template>

<script>
import {getDetail,getDetailCinema} from "../../services/movieService"
import {getBuyMovie} from "../../services/appService"
import CinemaItem from "../../components/cinema/CinemaItem"
import {mapState} from "vuex"
export default {
    components: {
        'cinema-item': CinemaItem
    },
    data(){
        return {
            movie: null,
            movieId: this.$route.params.movieId,
            cinemas: [],
            dates: [],
            dateActive: 0
        }
    },
    watch: {
        movieId(){
            this.insertData();
        }
    },
    created(){
        this.insertData();
    },
    computed: {
        ...mapState(['cityId'])
    },
    methods: {
        backAction(){
            this.$router.back();
        },
        insertData(){
            getDetail(this.movieId)
            .then(movie=>{
                this.movie = movie;
            });
            getDetailCinema(this.movieId,this.$store.state.cityId)
            .then(data=>{
                this.cinemas = data.cinemas;
                this.dates = data.dates;
            });
            getBuyMovie(this.movieId);
        },
        // 切换时间
        dateActiveAction(day){
            // 选择的时间为激活状态
            this.dateActive = day.index;
            // 请求选泽的时间的数据
            getDetailCinema(this.movieId,day.date,this.cityId)
            .then(data=>{
                this.cinemas = data.cinemas;
            });
        },
        movieLink(){
            location.href = `http://m.maoyan.com/movie/${this.movieId}?_v_=yes&channelId=4&$from=canary`
        },
        handleSelectCall(isActive){
            if(isActive){
                this.$refs["day-tab"].className = "day-tab active";
            }else{
                this.$refs["day-tab"].className = "day-tab";
            }
        }
    },
    deactivated(){
        this.$destroy();
    },
}
</script>

<style lang="scss" scoped>
.detail-wrap{
    background: #fff;
}
.detail{
    .back{
        padding: 10px;
    }
    .movie-detail{
        position: relative;
        height: 188px;
        .movie-filter{
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;
            background-color: #333;
        }
        .movie-bg{
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            position: absolute;
            filter: blur(20px);
            opacity: .55;
        }
        .movie-con{
            height: 150px;
            padding: 19px 30px 19px 15px;
            display: flex;
            .img{
                width: 110px;
                height: 150px;
                img{
                    width: 100%;
                    height: 150px;
                }
            }
            .con{
                overflow-x: hidden;
                margin-left: 12px;
                color: #fff;
                line-height: 12px;
                .nm{
                    font-size: 20px;
                    margin-top: 2px;
                    font-weight: 700;
                    overflow: hidden;
                    line-height: 20px;
                }
                .sc-snum{
                    font-size: 18px;
                    font-weight: 700;
                    color: #fc0;
                    margin-top: 11px;
                    line-height: 18px;
                    span{
                        margin-left: 5px;
                    }
                }
                .enm,.sc-snum span,.cat-version,.src-dur,.pub{
                    margin-top: 10px;
                    font-size: 12px;
                    color: #fff;
                    opacity: .8;
                }
            }
            .arrow-g{
                position: absolute;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                color: #ddd;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
    .day-tab{
        width: 100%;
        z-index: 10;
        &.active{
            position: fixed;
            left: 0;
            top: 50px;
        }
        .showDays{
            width: 100%;
            background-color: #fff;
            overflow-x: scroll;
            height: 45px;
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
    }
}
</style>
