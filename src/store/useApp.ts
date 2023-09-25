import { defineStore } from 'pinia'
import { setToken, clearLocalStorage, getUserData } from '../utils';
import { LangType } from '../utils/lang-type';


export const useApp = defineStore('useApp', {
     state: () => ({
          collapse: false,
          lang: "zh-tw",
          accessToken: "",
          user: {} as any,
     }),
     getters: {
          currentLang: (state) => state.lang,
     },
     actions: {
          /**
           * 設定 token 
           * @param response 
           * @returns 
           */
          setToken(response: any) {
               return new Promise((resolve, reject) => {
                    setToken(response.token);
                    this.accessToken = response.token;
                    this.user = response;
                    if (this.user) {
                         resolve(true);
                    }
                    resolve(false);
               });
          },
          /**
           * 登出
           */
          logout() {
               this.user = {} as any;
               this.accessToken = "";
               clearLocalStorage();
          },
          /**
           * 
           * @param val 
           */
          setCollapse(val: boolean) {
               this.collapse = val;
          },
          /**
           * 切換語系
           * @param lang 
           */
          setLanguage(lang: any) {
               this.lang = this.lang === LangType.ZH ? LangType.EN : LangType.ZH;
          },
     },
     persist: true
})