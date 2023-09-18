import { useRouter, useRoute } from "vue-router";

export function routeHandle() {
     const router = useRouter();
     const route = useRoute();
     /**
      * 導覽頁面
      * @param url 
      */
     const navigation = (url: any) => {
          router.push({ path: url });
     }
     return {
          navigation
     }
}

