import Vue from "vue";
import VueRouter from "vue-router";

//  导入路由
import Home from "../components/home";
import home from '../views/home/Home'
import Merchant from "../components/merchant";
import MerchantAdd from "../components/merchantAdd";
import ShopAdd from "../components/shopAdd";
import Shop from "../components/shop";
import Statistics from "../components/statistics";
import User from "../components/user";
import Intellectual from "../components/intellectual";
import Login from "../views/home/Login"
import Account from "../components/account"
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "Home",
      component: Home,
      children: [{
        path: '/',
        component: home
      }
        ,
      {
        path: "account",
        name: "Account",
        component: Account
      } ,
      {
        path: "merchant",
        name: "Merchant",
        component: Merchant
      },
      {
        path: "merchantAdd",
        name: "MerchantAdd",
        component: MerchantAdd
      },
      {
        path: "shopAdd",
        name: "ShopAdd",
        component: ShopAdd
      },
      {
        path: "shop",
        name: "Shop",
        component: Shop
      },
      {
        path: "statistics",
        name: "Statistics",
        component: Statistics
      },
      {
        path: "user",
        name: "User",
        component: User
      },
      {
        path: "intellectual",
        name: "Intellectual",
        component: Intellectual
      }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: "*",
      redirect: "/home"
    },
  ]
});
//  全局守卫
// router.beforeEach((to, from, next) => {
//   let token = sessionStorage.getItem('token');
//   if (token) {
//     next()
//   } else {
//     if (to.path === '/login') {
//       next();
//     } else {
//       // 如果去的是其他页,跳转到登录页
//       // 跳转到登录页
//       return next({ "path": "/login" })
//     }
//   }
// });
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => { })
}
export default router;
