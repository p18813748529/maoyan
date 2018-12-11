import API from "../api"
import http from "../utils/http"

export function getCinemaList(id,offset){
    offset = offset || 0;
    let date = new Date();
    let day = date.toLocaleString().split(" ")[0].replace(/\//g,"-");
    console.log()
    return new Promise((resolve,reject)=>{
        http({
            url: API.CINEMA_API,
            method: "GET",
            data: {
                day,
                offset,
                limit:20,
                cityId:id
                // districtId:-1,
                // lineId:-1,
                // hallType:-1,
                // brandId:-1,
                // serviceId:-1,
                // areaId:-1,
                // stationId:-1,
                // item: '',
                // updateShowDay:true,
                // reqId:1542382671576,
            }
        })
        .then(({data,status})=>{
            if(status==200){
                let cinemas = data.cinemas.map((cinema)=>{
                    let {addr,distance,id,nm,promotion: {cardPromotionTag},sellPrice,
                        tag: {
                            allowRefund, 
                            endorse, 
                            hallType, 
                            snack, 
                            vipTag
                        }} = cinema;
                    return {addr,distance,id,nm,promotion: {cardPromotionTag},sellPrice,
                        tag: {
                            allowRefund,        //是否可退
                            endorse,            //改签
                            hallType,           //大厅类型
                            snack,              //小吃
                            vipTag              //折扣卡
                        }}
                });
                resolve(cinemas)
            }
        })
    });
}

// 获取影院详情
export function getCinemaDetail(cinemaId){
    return new Promise((resolve,reject)=>{
        http({
            url: API.CINEMA_DETAIL_API,
            method: "GET",
            data: {
                cinemaId
            }
        }).then(({data,status})=>{
            if(status==200){
                let {cinemaData,dealList,showData} = data;
                let cinemaDetail = {cinemaData,dealList: dealList.dealList,movies: showData.movies,vipInfo: showData.vipInfo};
                resolve(cinemaDetail);
            }
        })
    })
}

// 获取筛选信息
export function getFilterCinemas(cityId){
    return new Promise((resolve,reject)=>{
        http({
            url: API.FILTER_CINEMAS_API,
            method: "GET",
            data: {
                ci: cityId
            }
        })
        .then(({data,status})=>{
            if(status==200){
                let {brand,district,hallType,service,subway,timeRanges} = data
                resolve({brand,district,hallType,service,subway,timeRanges});
            }
        })
    });
}