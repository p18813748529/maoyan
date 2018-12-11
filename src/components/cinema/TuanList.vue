<template>
    <div class="tuan-list" v-if="tuanList.length>0">
        <div class="gap" style="height: 10px; background-color: #f0f0f0;"></div>
        <div class="tuan-title">影院超值套餐</div>
        <div class="tuan-item" v-for="(item,index) in tuanList" :key="index">
            <img data-ui-type="image-viewer" :src="item.imageUrl | replaceSrc(400,0)">
            <div class="item-info">
                <div class="title">
                    <span v-if="item.recommendPersonNum==2">双人</span>
                    <span v-else-if="item.recommendPersonNum==1">单人</span>
                    <span v-else>多人</span>
                    {{item.title}}
                </div>
                <div class="sell-num">{{item.curNumberDesc}}</div>
                <div class="price">
                    <span class="sell-price">
                        <span>¥</span><span class="num">{{item.price}}</span>
                    </span>
                </div>
                <div class="buy-btn">去购买</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["tuanList"],
}
</script>

<style lang="scss" scoped>
.tuan-list{
    padding-left: 15px;
    .tuan-title{
        line-height: 45px;
        height: 45px;
        font-size: 15px;
        color: #666;
    }
    .tuan-item{
        cursor: pointer;
        position: relative;
        width: 100%;
        padding: 13px 0;
        overflow: hidden;
        img{
            display: inline-block;
            width: 92px;
            height: 92px;
            float: left;
        }
        .item-info{
            position: relative;
            margin: 0 15px 0 102px;
            height: 92px;
            overflow: hidden;
            .title{
                font-size: 14px;
                line-height: 18px;
                color: #333;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                span{
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 1px;
                    margin-right: 7px;
                    padding: 0 4px;
                    font-size: 10px;
                    line-height: 15px;
                    height: 15px;
                    background: #f90;
                    border-radius: 2px;
                    color: #fff;
                }
            }
            .sell-num{
                display: inline-block;
                position: absolute;
                bottom: 34px;
                right: 0;
                line-height: 16px;
                height: 16px;
                font-size: 12px;
                color: #999;
            }
            .price{
                position: absolute;
                bottom: 0;
                left: 0;
                .sell-price{
                    color: #f03d37;
                    display: inline-block;
                    span{
                        font-size: 14;
                    }
                    .num{
                        font-size: 17px;
                    }
                }
            }
            .buy-btn{
                position: absolute;
                right: 0;
                bottom: 0;
                display: inline-block;
                padding: 0 8px;
                height: 27px;
                line-height: 27px;
                font-size: 12px;
                border-radius: 3px;
                color: #fff;
                background-color: #f03d37;
            }
        }
    }
}
</style>
