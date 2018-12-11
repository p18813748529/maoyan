<template>
    <div class="movie-item" @click="detailAction">
        <div class="m-img">
            <img :src="movie.img | replaceSrc(64,90)" alt="">
        </div>
        <div class="m-content">
            <div class="content-wrap">
                <p class="nm">
                    <span class="text">{{movie.nm}}</span>
                    <span :class="movie.version"></span>
                </p>
                <p v-if="movie.showst=='购票'&&movie.sc>0">观众评&nbsp;<span class="mark">{{movie.sc}}</span></p>
                <p v-else-if="movie.showst=='购票'&&movie.sc==0">暂无评分</p>
                <p v-else-if="movie.showst=='预售'||movie.showst=='想看'"><span class="mark">{{movie.wish}}</span>&nbsp;人想看</p>
                <p class="star">{{movie.star}}</p>
                <p class="showInfo">{{movie.rt}}&nbsp;上映</p>
            </div>
            <status-btn v-if="movie.showst" class="showst" :text="movie.showst"></status-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movie: Object
    },
    methods: {
        detailAction(){
            this.$emit("clickAction",this.movie.id);
        }
    }
}
</script>

<style lang="scss" scoped>
.movie-item{
    display: flex;
    padding: 15px;
    background: #fff;
    .m-img{
        width: 64px;
    }
    .m-content{
        flex: 1;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        overflow: hidden;
        .content-wrap{
            width: 74%;
            margin-left: 10px;
            font-size: 14px;
            color: #666;
            line-height: 22px;
            .nm{
                font-size: 16px;
                font-weight: bold;
                color: #333;
                display: flex;
                align-items: center;
                .text{
                    max-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-right: 5px;
                }
                .v3d{
                    width: 17px;
                    height: 14px;
                    background-image: url("../../assets/3d.png");
                    background-size: cover;
                    &.imax{
                        width: 43px;
                        background-image: url("../../assets/3d_max.png");
                    }
                }
            }
            .mark{
                color: #faaf00;
                font-size: 16px;
                font-weight: bold;
            }
            .star,.showInfo{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .showst{
            margin-left: 5px;
        }
    }
}
</style>
