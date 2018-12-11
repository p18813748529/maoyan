<template>
    <div>
        <div class="show-list">
            <div class="show-item" v-for="(item,index) in plist" :key="index">
                <div class="time">
                    <p class="begin">{{item.tm}}</p>
                    <p class="end">{{countTime(item.tm)}} 散场</p>
                </div>
                <div class="lang-tp-th">
                    <p class="lang-tp"><span>{{item.lang}} {{item.tp}}</span></p>
                    <p class="th">{{item.th}}</p>
                </div>
                <div class="price-info">
                    <p class="price">
                        <!-- {{item.sellPr}}    价格是一个dom结构，拿不到 -->
                        <span class="sellPr"><small>￥</small>30</span>
                        <span class="vip-price">
                            <span class="icon">{{item.vipPriceName}}</span>
                            <span class="num">{{item.vipPrice}}</span>
                        </span>
                    </p>
                    <p class="offer">{{item.extraDesc}}</p>
                </div>
                <div>
                    <status-btn text="购票"></status-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["plist","times"],
    data(){
        return {

        }
    },
    methods: {
        countTime(tm){
            let _h = parseInt(this.times/60);
            let _m = this.times%60;
            tm = tm.split(":");
            let h = parseInt(tm[0]) + _h;
            let m = parseInt(tm[1]) + _m;
            if(m>=60){
                h += parseInt(m/60);
                m%=60;
            }
            if(m<10){
                m = "0" + m;
            }
            return `${h}:${m}`;
        }
    },
}
</script>

<style lang="scss" scoped>
.show-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
    .time{
        .begin{
            font-size: 20px;
            color: #333;
            line-height: 1;
            white-space: nowrap;
        }
        .end{
            margin-top: 10px;
            color: #999;
            font-size: 11px;
            line-height: 1;
            white-space: nowrap;
        }
    }
    .lang-tp-th{
        padding-right: 40px;
        .lang-tp{
            margin-top: 2px;
            line-height: 18px;
            font-size: 13px;
            color: #333;
            white-space: normal;
        }
        .th{
            margin-top: 7px;
            font-size: 11px;
            color: #999;
            white-space: normal;
        }
    }
    .price-info{
        .price{
            .sellPr{
                color: #f03d37;
                font-size: 18px;
            }
            .vip-price{
                display: inline-block;
                line-height: 15px;
                height: 15px;
                transform: scale(.8);
                transform-origin: left;
                margin-left: 5px;
                border: 1px solid #ff9000;
                border-radius: 2px;
                font-size: 12px;
                span{
                    display: inline-block;
                    padding: 0 2px;
                }
                .icon{
                    color: #fff;
                    background-color: #f90;
                }
                .num{
                    color: #f90;
                    background-color: #fff;
                }
            }
        }
        .offer{
            margin-top: 5px;
            display: block;
            font-size: 11px;
            color: #999;
        }
    }
}
</style>
