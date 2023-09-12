import { ref, computed, onBeforeUnmount, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { httpOperations } from "../utils/http-operations";
import { routeHandle } from "../hooks/route-handle";
import * as store from '../store';

export function pageHandle() {
     const container = reactive({ isLoading: false, message: "載入中" });
     const { t, locale } = useI18n();
     const { navigation } = routeHandle();

     onMounted(() => {
          console.log("onMounted");
     })

     onBeforeUnmount(() => {
          console.log('onBeforeUnmount');
     })
     return {
          container,
          navigation,
          httpOperations,
          store
     }
}

/**
 導覽頁面 
 page.navigation("/inbound/1"); 

 isLoading
 page.container.isLoading = true;
 */