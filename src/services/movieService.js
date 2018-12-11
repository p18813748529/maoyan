import http from "../utils/http"
import API from "../api"

let statusList = ['想看','','购票','预售'];

// 获取即将上映
export function getPlayingList(){
    return new Promise((resolve,reject)=>{
        http({
            url: API.PLAYING_API,
            method: "GET",
            data: {
                token: ''
            }
        })
        .then(({data,status})=>{
            // 请求成功
            if(status==200){
                let ids = data.movieIds;
                let playingList = data.movieList.map((movie)=>{
                    let {id,img,nm,rt,sc,showInfo,showst,star,version,wish} = movie;
                    showst = statusList[showst-1];
                    return {id,img,nm,rt,sc,showInfo,showst,star,version,wish};
                });
                resolve({ids,playingList});
            }else{
                // 请求失败
                reject();
            }
        })
        .catch(error=>{
            // 请求失败
            reject();
        });
    });
}
// 获取更多正在上映
export function getMorePlayingList(ids){
    return new Promise((resolve,reject)=>{
        http({
            url: API.MORE_PLAYING_API,
            method: "GET",
            data: {
                token: '',
                movieIds: ids
            }
        })
        .then(({data,status})=>{
            // 请求成功
            if(status==200){
                let playingList = data.coming.map((movie)=>{
                    let {id,img,nm,rt,sc,showInfo,showst,star,version,wish} = movie;
                    showst = statusList[showst-1];
                    return {id,img,nm,rt,sc,showInfo,showst,star,version,wish};
                });
                resolve(playingList);
            }else{
                // 请求失败
                reject();
            }
        })
        .catch(error=>{
            // 请求失败
            reject();
        });
    });
}
// 获取即将上映
export function getComingList(ci){
    return new Promise((resolve,reject)=>{
        http({
            url: API.COMING_API,
            method: "GET",
            data: {
                token: '',
                ci,
                limit: 10
            }
        })
        .then(({data,status})=>{
            // 请求成功
            if(status==200){
                let comingList = data.coming.map((movie)=>{
                    let {comingTitle,id,img,nm,rt,sc,showInfo,showst,star,version,wish} = movie;
                    showst = statusList[showst-1];
                    return {comingTitle,id,img,nm,rt,sc,showInfo,showst,star,version,wish};
                });
                let comingObj = {}
                comingList.map(movie=>{
                    if(!comingObj[movie.comingTitle]){
                        comingObj[movie.comingTitle] = [];
                    }
                    comingObj[movie.comingTitle].push(movie);
                });
                let ids = data.movieIds;
                resolve({comingObj,ids});
            }else{
                // 请求失败
                reject();
            }
        })
        .catch(error=>{
            // 请求失败
            reject();
        });
    });
}
// 获取更多即将上映
export function getMoreComingList(ids,comingObj,ci){
    return new Promise((resolve,reject)=>{
        http({
            url: API.MORE_COMING_API,
            method: "GET",
            data: {
                ci,
                token: '',
                limit: 10,
                movieIds: ids
            }
        })
        .then(({data,status})=>{
            // 请求成功
            if(status==200){
                let comingList = data.coming.map((movie)=>{
                    let {comingTitle,id,img,nm,rt,sc,showInfo,showst,star,version,wish} = movie;
                    showst = statusList[showst-1];
                    return {comingTitle,id,img,nm,rt,sc,showInfo,showst,star,version,wish};
                });
                comingList.map(movie=>{
                    if(!comingObj[movie.comingTitle]){
                        comingObj[movie.comingTitle] = [];
                    }
                    comingObj[movie.comingTitle].push(movie);
                });
                resolve(comingObj);
            }else{
                // 请求失败
                reject();
            }
        })
        .catch(error=>{
            // 请求失败
            reject();
        });
    });
}
// 获取近期最受期待
export function getExpectedList(offset,ci,limit){
    console.log(limit)
    return new Promise((resolve,reject)=>{
        http({
            url: API.EXPECTED_API,
            method: "GET",
            data: {
                ci,
                token: '',
                limit,
                offset
            }
        })
        .then(({data,status})=>{
            // 请求成功
            if(status==200){
                let expectedList = data.coming.map((movie)=>{
                    let {comingTitle,id,img,nm,wish} = movie;
                    comingTitle = comingTitle.split(" ")[0];
                    return {comingTitle,id,img,nm,wish};
                });
                let total = data.paging.total;
                resolve({expectedList,total});
            }else{
                // 请求失败
                reject();
            }
        })
        .catch(error=>{
            // 请求失败
            reject();
        });
    });
}
// 获取电影详情
export function getDetail(movieId){
    return new Promise((resolve,reject)=>{
        http({
            url: API.DETAIL_API,
            method: "GET",
            data: {
                movieId
            }
        }).then(({data,status})=>{
            if(status==200){
                let {img,nm,enm,sc,snum,cat,version,src,dur,pubDesc} = data.detailMovie
                snum = (snum/10000).toFixed(1);
                resolve({img,nm,enm,sc,snum,cat,version,src,dur,pubDesc});
            }
        })
        .catch(error=>{

        });
    });
}
// 获取电影详情中的影院信息
export function getDetailCinema(movieId,cityId,day){
    return new Promise((resolve,reject)=>{
        http({
            url: API.DETAIL_CENIMA_API,
            method: "POST",
            data: {
                movieId,
                day: day || (new Date()).toLocaleDateString().replace(/\//g,"-"),
                offset: 0,
                limit: 20,
                updateShowDay: true,
                reqId: 1542596905634,
                cityId,
                forceUpdate: 1542613095212,
            }
        })
        .then(({data,status})=>{
            if(status==200){
                resolve({cinemas: data.cinemas, dates: data.showDays.dates});
            }
        });
    });
}