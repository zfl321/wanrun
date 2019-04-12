import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";

// 设置上线时不产生提示信息
Vue.config.productionTip = false
// 使用element-ui插件
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = Axios;
import { Message } from 'element-ui';
Vue.prototype.$message = Message

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    // const role = localStorage.getItem('ms_username');
    // console.log(to)
    // if (!role && to.path !== '/login') {
    //     next('/login');
    // } else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     role === 'admin' ? next() : next('/403');
    // } else {
    //     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    // if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    //     Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
    //         confirmButtonText: '确定'
    //     });
    // } else {
    //     next();
    // }
    // }
    var userInfo = window.localStorage.getItem('token');//获取浏览器缓存的用户信息
    if (userInfo) { //如果有就直接到首页咯
        next();
    } else {
        if (to.path == '/login') { //如果是登录页面路径，就直接next()
            next();
        } else { //不然就跳转到登录；
            next('/login');
        }

    }
})
// var passiveSupported = false;
// try {
//     var options = Object.defineProperty({}, "passive", {
//         get: function () {
//             passiveSupported = true;
//         }
//     });
//     window.addEventListener("test", null, options);
// } catch (err) { }
// function fn () {
//     console.log("fn")
// }
// document.addEventListener("mousewheel", fn, passiveSupported ? { passive: true } : false)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')