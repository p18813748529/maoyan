import Vue from "vue"

// 给点指定的宽高，替换图片地址中的w，h
Vue.filter("replaceSrc",(src,w,h)=>{
    return src.replace(/w.h/,`${w}.${h}`);
});