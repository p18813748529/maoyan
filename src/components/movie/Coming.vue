<template>
<app-content @loadmore="getMoreData" style="top:95px;" :canLoadMore="canLoadMore">
    <div class="coming">
        <!-- 近期最受期待 -->
        <div class="expected">
            <h3 class="e-title">近期最受期待</h3>
            <scroll @loadmoreExpect="getMoreExpect" :canLoadMore="canLoadExpect">
                <div class="e-item" v-for="expect in expectedList" :key="expect.id">
                    <div class="e-img">
                        <img :src="expect.img | replaceSrc(85,115)" alt="">
                        <span class="wish">{{expect.wish}}人想看</span>
                    </div>
                    <div class="e-content">
                        <p class="nm">{{expect.nm}}</p>
                        <p class="comingTitle">{{expect.comingTitle}}</p>
                    </div>
                </div>
            </scroll>
        </div>
        <!-- 即将上映 -->
        <div v-for="(movies,time) in comingList" :key="time">
            {{time}}
            <movie-item v-for="(movie,index) in movies" :key="index" :movie="movie" 
                @clickAction="preMovieAction(movie.id)"></movie-item>
        </div>
    </div>
</app-content>
</template>
<script>
import {mapState} from "vuex"
import MovieItem from "./MovieItem"
import {getComingList,getMoreComingList,getExpectedList} from "../../services/movieService"
export default {
    components: {
        "movie-item": MovieItem
    },
    data(){
        return {
            comingList: [],
            comingIds: [],
            expectedList: [],
            expectTotal: 0,
            canLoadMore: true,
            canLoadExpect: true,
        }
    },
    computed: {
        ...mapState(['cityId']),
        comingListLength(){
            let length = 0;
            for(var key in this.comingList){
                length+=this.comingList[key].length;
            }
            return length;
        }
    },
    watch: {
        cityId(){
            this.inserData();
        }
    },
    created(){
        this.inserData();
    },
    methods: {
        inserData(){
            getComingList(this.cityId)
            .then(data=>{
                this.comingList = data.comingObj;
                this.comingIds = data.ids;
            });
            getExpectedList(0,this.cityId,this.expectedList.length||10)
            .then(data=>{
                this.expectedList = data.expectedList;
                this.expectTotal = data.total
            });
        },
        getMoreData(){
            let ids = [...this.comingIds];
            ids = ids.splice(this.comingListLength, 10);
            let movieIds = ids.join(',');
            this.canLoadMore = false;
            getMoreComingList(movieIds,this.comingList,this.cityId).then(result=>{
                this.comingList = Object.assign({},this.comingList,result);
                if(this.comingListLength >= this.comingIds.length){
                    this.canLoadMore = false;
                }else{
                    this.canLoadMore = true;
                }
            })
        },
        getMoreExpect(){
            this.canLoadExpect = false;
            getExpectedList(this.expectedList.length,this.cityId,20)
            .then(data=>{
                if(data.expectedList.length>0){
                    this.expectedList = [...this.expectedList,...data.expectedList];
                    this.canLoadExpect = true;
                }
            });
        },
        preMovieAction(movieId){
            // this.$router.push({name: "pre-movie", params: movieId});
            location.href = `http://m.maoyan.com/movie/${movieId}?_v_=yes&channelId=4&$from=canary`
        }
    }
}
</script>

<style lang="scss" scoped>
.expected{
    padding: 0 8px;
    .e-title{
        font-size: 16px;
        line-height: 30px;
        padding-left: 5px;
    }
    .e-item{
        width: 85px;
        padding: 7px;
        display: inline-block;
        border-bottom: 3px solid #eee;
        padding-bottom: 20px;
        margin-bottom: 20px;
        .e-img{
            position: relative;
            img{
                width: 85px;
                height: 115px;
            }
            .wish{
                width: 100%;
                text-align: center;
                color: #faaf00;
                font-size: 12px;
                font-weight: bold;
                position: absolute;
                left: 50%;
                bottom: 5px;
                transform: translateX(-50%);
                background: rgba($color: #000000, $alpha: 0.5);
            }
        }
        .e-content{
            .nm{
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #333;
            }
            .comingTitle{
                color: #666;
                font-size: 12px;
            }
        }
    }
}
</style>
