import { onBeforeMount, onBeforeUnmount } from "vue";
import { useApp } from "../store/useApp";

export function resizeHandler() {
     const { body } = document
     const app = useApp()

     onBeforeMount(() => {
          window.addEventListener('resize', resizeHandler);
          resizeHandler();
     })

     onBeforeUnmount(() => {
          window.removeEventListener('resize', resizeHandler);
     })

     const resizeHandler = () => {
          const rect = body.getBoundingClientRect()
          const collapse = rect.width <= 960 ? true : false;
          app.setCollapse(collapse);
     }
     return {
          resizeHandler
     }
}