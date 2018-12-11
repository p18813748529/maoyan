<template>
    <div class="page" id="movie">
        <app-header title="猫眼电影"></app-header>
        <div class="topbar">
            <div class="select-city" @click="selectCityAction">
                <span>{{city}}</span>
                <i></i>
            </div>
            <ul class="switch-hot">
                <li v-for="(item,index) in navList" :key="index" @click="changeShow(index)"
                     :class="{activeShow: showIndex==index}">
                    {{item}}
                </li>
            </ul>
            <div class="search" @click="searchAction">
                <img src="../../assets/search.png" alt="">
            </div>
        </div>
        <keep-alive>
            <playing v-if="showIndex==0"></playing>
            <coming v-if="showIndex==1"></coming>
        </keep-alive>
    </div>
</template>

<script>
import {mapState,mapActions} from "vuex"
import Playing from "../../components/movie/Playing"
import Coming from "../../components/movie/Coming"
export default {
    components: {
        "playing": Playing,
        "coming": Coming,
    },
    data(){
        return {
            navList: ["正在热映","即将上映"],
            showIndex: 0,
        }
    },
    computed: {
        ...mapState(['city'])
    },
    methods: {
        changeShow(index){
            this.showIndex = index;
        },
        selectCityAction(){
            this.$router.push('/city');
        },
        searchAction(){
            this.$router.push("/search/movie");
        },
        ...mapActions(["setPath"])
    },
    activated(){
        this.setPath(this.$route.path);
    }
}
</script>

<style lang="scss" scoped>
#movie{
    .topbar{
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #666;
        border-bottom: 1px solid #eee;
        .select-city{
            font-size: 14px;
            display: flex;
            align-items: center;
            padding-left: 15px;
            i{
                width: 0;
                height: 0;
                border: 5px solid transparent;
                border-top-color: #666;
                position: relative;
                top: 5px;
                left: 5px;
            }
        }
        .switch-hot{
            display: flex;
            font-size: 16px;
            font-weight: bold;
            li{
                padding: 10px;
                margin: 0 10px;
                &.activeShow{
                    color: #ef4238;
                    border-bottom: 2px solid #ef4238;
                }
            }
        }
        .search{
            width: 45px;
            height: 40px;
            img{
                width: 20px;
                margin: 10px;
            }
        }
    }
}
</style>
