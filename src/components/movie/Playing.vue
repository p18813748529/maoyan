<template>
<app-content @loadmore="getMoreData" style="top:95px;" :canLoadMore="canLoadMore">
    <div class="playing">
        <movie-item v-for="movie in playingList" :key="movie.id" :movie="movie" @clickAction="detailAction">
        </movie-item>
    </div>
</app-content>
</template>
<script>
import {mapState} from "vuex"
import MovieItem from "./MovieItem"
import {getPlayingList,getMorePlayingList} from "../../services/movieService"
export default {
    components: {
        "movie-item": MovieItem
    },
    data(){
        return {
            playingList: [],
            playingIds: [],
            canLoadMore: true
        }
    },
    computed: {
        ...mapState(['cityId'])
    },
    watch: {
        cityId(){
            this.insertData();
        }
    },
    created(){
        this.insertData();
    },
    methods: {
        insertData(){
            getPlayingList()
            .then((data)=>{
                console.log(data)
                this.playingList = data.playingList;
                this.playingIds = data.ids;
            });
        },
        getMoreData(){
            let ids = [...this.playingIds];
            ids = ids.splice(this.playingList.length, 10);
            let movieIds = ids.join(',');
            this.canLoadMore = false;
            getMorePlayingList(movieIds).then(result=>{
                this.playingList = [...this.playingList, ...result];
                if(this.playingList.length >= this.playingIds.length){
                    this.canLoadMore = false;
                }else{
                    this.canLoadMore = true;
                }
                
            })
        },
        detailAction(movieId){
            this.$router.push(`/detail/${movieId}`);
        }
    }
}
</script>

<style lang="scss" scoped>
.playing{

}
</style>
