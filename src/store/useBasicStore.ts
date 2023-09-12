// import { defineStore } from 'pinia';
//import setting from '@/settings'
export const useBasicStore = defineStore('useBasicStore', {
     state: () => {
          return {
               // 標籤資料
               visitedViews: Array<any>(),
               // keep alive cachedViews  
               cachedViews: Array<any>()
          }
     },
     getters: {
          getVisitedViews(state) {
               return state.visitedViews;
          }
     },
     actions: {
          /**
           * 
           * @param route 
           */
          addVisitedView(route: any) {
               this.$patch((state) => {
                    if (state.visitedViews.some((v: any) => v.path === route.path)) {
                         return
                    }
                    const tagViwe = {
                         name: route.name,
                         path: route.path,
                         query: route.query,
                         meta: route.meta
                    }
                    state.visitedViews.push(tagViwe);

                    if (state.cachedViews.includes(route.name)) {
                         return
                    }
                    state.cachedViews.push(route.name);
               })
          },
          delVisitedView(view: any) {
               return new Promise((resolve) => {
                    this.$patch((state: any) => {
                         //匹配view.path元素将其删除
                         for (const [i, v] of state.visitedViews.entries()) {
                              if (v.path === view.path) {
                                   state.visitedViews.splice(i, 1)
                                   break
                              }
                         }
                         const index = state.cachedViews.indexOf(view.name);
                         if (index > -1) {
                              console.log(index);
                              state.cachedViews.splice(index, 1);
                         }
                         resolve([...state.visitedViews])
                    })
               })
          },
          delOthersVisitedViews(view: any) {
               return new Promise((resolve) => {
                    this.$patch((state: any) => {
                         state.visitedViews = state.visitedViews.filter((v: any) => {
                              return v.meta.affix || v.path === view.path
                         })
                         resolve([...state.visitedViews])
                    })
               })
          },
          delAllVisitedViews() {
               return new Promise((resolve) => {
                    this.$patch((state: any) => {
                         // keep affix tags
                         state.visitedViews = state.visitedViews.filter((tag: any) => tag.meta?.affix)
                         resolve([...state.visitedViews])
                    })
               })
          }
     },
     persist: true
})