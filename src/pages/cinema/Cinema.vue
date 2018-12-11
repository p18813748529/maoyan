<template>
    <div class="page" id="cinema">
        <app-header title="影院"></app-header>
        <div class="top-bar">
            <div class="select-city">
                <span class="city-name" @click="selectAction">{{city}}</span>
                <i class="icon"></i>
            </div>
            <div class="search-cinema" @click="searchAction">
                <i class="icon"></i>
                <span>搜影院</span>
            </div>
        </div>
        <select-tab></select-tab>
        <app-content :style="{top: '134px',bottom: '0'}" ref="content" @loadmore="getMoreData"
             :canLoadMore="canLoadMore">
            <cinema-item :cinemas="cinemaList"></cinema-item>
        </app-content>
    </div>
</template>

<script>
import {mapState,mapActions} from "vuex"
import {getCinemaList,getFilterCinemas} from "../../services/cinemaService"
import CinemaItem from "../../components/cinema/CinemaItem"
export default {
    components:{
        "cinema-item": CinemaItem
    },
    data(){
        return {
            cinemaList: [],
            canLoadMore: true
        }
    },
    computed: {
        ...mapState(["cityId","city"])
    },
    watch: {
        cityId(){
            this.insertData();
        }
    },
    created(){
        this.insertData();
    },
    activated(){
        this.setPath(this.$route.path);
    },
    methods: {
        ...mapActions(["setPath"]),
        insertData(){
            getCinemaList(this.cityId)
            .then(cinemaList=>{
                this.cinemaList = cinemaList;
            });
        },
        selectAction(){
            this.$router.push("/city");
        },
        searchAction(){
            this.$router.push("/search/cinema");
        },
        getMoreData(){
            this.canLoadMore = false;
            getCinemaList(this.cityId,this.cinemaList.length)
            .then(cinemaList=>{
                if(cinemaList.length>=20){
                    this.canLoadMore = true;
                }else{
                    this.canLoadMore = false;
                }
                this.cinemaList.push(...cinemaList);
            });
        }
    }
}
</script>
<style lang='scss' scoped>
#cinema{
    .top-bar{
        background: #F5F5F5;
        display: flex;
        align-items: center;
        height: 44px;
        justify-content: space-between;
        .select-city{
            padding-left: 15px;
            font-size: 15px;
            color: #666;
            display: flex;
            align-items: center;
            .city-name{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 70px;
                color: #666;
            }
            .icon{
                margin-right: 5px;
                width: 0;
                height: 0;
                border: 4px solid transparent;
                border-top-color: #b0b0b0;
                display: inline-block;
                margin-left: 4px;
                margin-top: 5px;
            }
        }
        .search-cinema{
            flex: 1;
            display: flex;
            align-items: center;
            height: 28px;
            font-size: 13px;
            color: #b2b2b2;
            margin-left: 18px;
            border: 1px solid #e6e6e6;
            border-radius: 5px;
            margin-right: 15px;;
            justify-content: center;
            background-color: #fff;
            .icon{
                width: 14px;
                height: 14px;
                margin: 4px 4px 3px 0;
                background: url(../../assets/search-gray.png);
                background-size: cover;
            }
        }
    }
}
</style>
