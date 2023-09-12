import { useRouter, useRoute } from "vue-router";

export function routeHandle() {
     const router = useRouter();
     const route = useRoute();
     const appRoutes = Array<any>();
     /**
      * 重定位
      * @param url 
      */
     const redirect = (url: any) => {
          const redirectUrl = route.query && route.query.redirect;
          console.log(route.query.redirect);
     }
     /**
      * 導覽頁面
      * @param url 
      */
     const navigation = (url: any) => {
          router.push({ path: url });
     }
     /**
      * 
      * @returns 
      */
     const currentRouteValue = () => {
          //  route 全部 
          // console.log(router.getRoutes());
          return router.currentRoute;
     }
     const addViews = () => {
          appRoutes.push(router.currentRoute.value.meta);

          // localStorage.setItem('app-view', JSON.stringify(appRoutes))
     }

     const getAllViews = () => {
          const data = localStorage.getItem('app-view');

          if (data == null) {
               return data;
          }
          console.log(JSON.parse(data));
          return JSON.parse(data);
     }
     return {
          redirect,
          navigation,
          currentRouteValue,
          getAllViews,
          addViews
     }
}

