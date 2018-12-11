const SAT_HOST = 'http://localhost:8080';
const UAT_HOST = 'http://m.maoyan.com';
const PRO_HOST = 'http://m.maoyan.com';
// 电影页面

// 正在热映
const PLAYING_API = "/ajax/movieOnInfoList";
const MORE_PLAYING_API = "/ajax/moreComingList"

// 即将上映
const COMING_API = "/ajax/comingList";
const MORE_COMING_API = "/ajax/moreComingList";

// 近期最受期待
const EXPECTED_API = "/ajax/mostExpected";

// 获取城市列表
const CITY_API = "/dianying/cities.json";
// ------------------------------------------------

// 影院页面
// 影院列表
const CINEMA_API = "/ajax/cinemaList";
// 影院详情
const CINEMA_DETAIL_API = "/ajax/cinemaDetail"
// 获取筛选信息
const FILTER_CINEMAS_API = "/ajax/filterCinemas"

// 电影详情
const DETAIL_API = "/ajax/detailmovie";
const DETAIL_CENIMA_API = "/ajax/movie";

//购票页面
const BUY_API = "/movie"

// 搜索页面
const SEARCH_API = "/ajax/search"

export default {
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    PLAYING_API,
    MORE_PLAYING_API,
    COMING_API,
    MORE_COMING_API,
    EXPECTED_API,
    CITY_API,
    CINEMA_API,
    CINEMA_DETAIL_API,
    FILTER_CINEMAS_API,
    DETAIL_API,
    DETAIL_CENIMA_API,
    BUY_API,
    SEARCH_API
}