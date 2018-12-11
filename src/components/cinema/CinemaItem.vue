<template>
    <ul>
        <li class="cine-item" v-for="cine in cinemas" :key="cine.id" @click="toCinemaDetail(cine.id)">
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
                <i class="allowRefund" v-if="cine.tag.allowRefund">退</i>
                <i class="endorse" v-if="cine.tag.endorse">改签</i>
                <i class="snack" v-if="cine.tag.snack">小吃</i>
                <i class="vipTag" v-if="cine.tag.vipTag">{{cine.tag.vipTag}}</i>
                <i class="hall" v-for="(type,index) in cine.tag.hallType" :key="index">
                    {{type}}
                </i>
            </p>
            <p v-if="cine.promotion.cardPromotionTag" class="tag">
                <i class="icon"></i>
                {{cine.promotion.cardPromotionTag}}
            </p>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        cinemas: Array
    },
    methods: {
        toCinemaDetail(cineId){
            this.$router.push({name: "cinema-detail", params: {cineId}})
        }
    }
}
</script>

<style lang='scss' scoped>
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
</style>
