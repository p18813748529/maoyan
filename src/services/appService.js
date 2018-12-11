import http from "../utils/http"
import API from "../api"

// 获取城市列表
export function getCityList(){
    return new Promise((resolve,reject)=>{
        http({
            url: API.CITY_API,
            method: "GET"
        })
        .then(({data, status})=>{
            // 请求成功
            if(status==200){
                let cityList = data.cts;
                let cityMap = {};
                // 按拼音首字母分类
                cityList.map(city=>{
                    let letter = city.py.charAt(0);
                    if(!cityMap[letter]){
                        cityMap[letter] = [];
                    }
                    cityMap[letter].push(city);
                });
                // 排序
                let keys = Object.keys(cityMap).sort();
                let newData = [];
                keys.map(key=>{
                    newData.push(cityMap[key]);
                });
                resolve({cityList: newData,keys});
            }
        })
    })
}

// 获取购票的电影数据
export function getBuyMovie(movieId){
    return new Promise((resolve,reject)=>{
        http({
            url: API.BUY_API + '/' + movieId,
            method: "GET",
            data: {
                _v_: 'yes',
                'channelId': 4,
                $from: 'canary'
            }
        })
        .then(({data,status})=>{
            // console.log(data);
        });
    });
}

// 获取搜索数据
export function getSearchData(kw,cityId,stype){
    return new Promise((resolve,reject)=>{
        http({
            url: API.SEARCH_API,
            method: "GET",
            data: {
                kw,
                cityId,
                stype
            }
        })
        .then(({data,status})=>{
            if(status==200){
                resolve(data);
            }
        });
    });
}