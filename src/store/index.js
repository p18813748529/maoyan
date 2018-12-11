import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    city: "深圳",
    cityId: 30,
    pagePath: '/movie'
  },
  mutations: {
    setCity(state,city){
      state.city = city;
    },
    setCityId(state,id){
      state.cityId = id;
    },
    setPagePath(state,path){
      state.pagePath = path;
    }
  },
  actions: {
    selectCity(context,params){
      context.commit("setCity",params.city);
      context.commit("setCityId",params.id);
      document.cookie = `ci=${params.id},${params.city}`;
    },
    setPath(context,params){
      context.commit("setPagePath",params);
    }
  }
})
