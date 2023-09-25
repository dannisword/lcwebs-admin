export const useBasicStore = defineStore('useBasicStore', {
     state: () => {
          return {
               visitedViews: Array<any>(),
               cachedViews: Array<any>()
          }
     },
     getters: {
          getVisitedViews(state) {
               return state.visitedViews;
          },
          getCachedViews(): string[] {
               return Array.from(this.cachedViews)
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
                         for (const [i, v] of state.visitedViews.entries()) {
                              if (v.path === view.path) {
                                   state.visitedViews.splice(i, 1)
                                   break
                              }
                         }
                         const index = state.cachedViews.indexOf(view.name);
                         if (index > -1) {
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
               this.visitedViews = [];
               this.cachedViews = [];
          }
     },
     persist: true
})