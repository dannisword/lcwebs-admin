import { ref, computed, onBeforeUnmount, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { routeHandle } from "../hooks/route-handle";

export function pageHandle() {
     const container = reactive({ isLoading: false, message: "載入中" });
     const { t, locale } = useI18n();
     return {
          container
     }
}