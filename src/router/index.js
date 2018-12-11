import Vue from 'vue'
import Router from 'vue-router'

import Movie from '../pages/movie/Movie'
import Cinema from '../pages/cinema/Cinema'
import Mine from '../pages/mine/Mine'
import City from '../pages/common/City'
import Search from '../pages/common/Search'
import Detail from '../pages/common/Detail'
import PreMovie from '../pages/common/PreMovie'
import Login from '../pages/common/Login'
import CinemaDetail from '../pages/common/CinemaDetail'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: "movie",
      path: "/movie",
      component: Movie
    },
    {
      name: "cinema",
      path: "/cinema",
      component: Cinema
    },
    {
      name: "cinema-detail",
      path: "/cinema-detail/:cineId",
      component: CinemaDetail,
      props: true
    },
    {
      name: "mine",
      path: "/mine",
      component: Mine
    },
    {
      name: "city",
      path: "/city",
      component: City
    },
    {
      name: "search",
      path: "/search/:type",
      component: Search,
      props: true
    },
    {
      name: "detail",
      path: "/detail/:movieId",
      component: Detail,
    },
    {
      name: "pre-movie",
      path: "/pre-movie/:movieId",
      component: PreMovie,
    },
    {
      name: "login",
      path: "/login",
      component: Login,
    },
    {
      path: "**",
      redirect: "/movie"
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.name == "mine"){
    let token = localStorage.getItem("token");
    if(token){
      next();
    }else{
      next({name: "login"})
    }
  }else{
    next();
  }
});

export default router;