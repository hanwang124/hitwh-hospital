import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import layout from '@/layout/layout'
import {systemRouterMap, doctorRouterMap,constantRouterMap} from "./router";
import {getCookie, setCookie} from "@/utils/cookies";

export function getPermission() {
  if (getCookie('username') === 'admin' ) {
    let array = constantRouterMap.concat(systemRouterMap);
    router.options.routes = array;
    router.onReady(() => {
      router.addRoutes(array)
    });
  } else {
    let array = constantRouterMap.concat(doctorRouterMap);
    router.options.routes = array;
    router.addRoutes(array)
  }
}
