import request from "./request";
import { warning, error } from "../utils";

const handleError = (e: any) => {
     console.log(e);
     // 發生非預期錯誤！
     if (e.response == undefined) {
          error("發生非預期錯誤！");
          return
     }

     //  404
     if (e.response.status == 404) {
          error("服務不存在");
          return;
     }
     // 403??
     // 400
     if (e.response.status == 400) {
          warning(e.response.data.message);
          return;
     }
}
let httpOperations = {
     /**
      * GET Methods
      * @param {*} url
      * @returns
      */
     get(url: any, params: any) {
          return new Promise((resolve, reject) => {
               request({
                    url: url,
                    method: "GET",
                    params: params
               }).then((response: any) => {
                    resolve({
                         successful: response.code == "200",
                         data: response.data,
                         msg: response.msg
                    });
               }).catch((e: any) => {
                    console.log(e);
                    handleError(e);
                    resolve({ successful: false });
               });
          });
     },
     /**
      * POST Methods
      * @param {*} url 
      * @param {*} data 
      * @returns 
      */
     post(url: any, data: any) {
          return new Promise((resolve) => {
               request({
                    url: url,
                    method: "POST",
                    data,
               }).then((response: any) => {
                    resolve({
                         successful: response.code == "200",
                         data: response.data,
                         msg: response.msg
                    });

               }).catch((e: any) => {
                    handleError(e);
                    resolve({ successful: false });
               });
          });
     },
     /**
      * PUT Methods
      * @param {*} url 
      * @param {*} data 
      * @returns 
      */
     put(url: any, data: any) {
          return new Promise((resolve) => {
               request({
                    url: url,
                    method: "PUT",
                    data,
               })
                    .then((response: any) => {
                         resolve({
                              successful: response.code == "200",
                              data: response.data,
                              msg: response.msg
                         });
                    })
                    .catch((e: any) => {
                         // snackbar.alert(e.message);
                         resolve({ successful: false, message: e.message });
                    });
          });
     },
     /**
      * DELETE Methods
      * @param {*} url 
      * @param {*} data 
      * @returns 
      */
     delete(url: any, data: any) {
          return new Promise((resolve) => {
               request({
                    url: url,
                    method: "DELETE",
                    data,
               })
                    .then((response: any) => {
                         resolve({
                              successful: response.code == "200",
                              data: response.data,
                              msg: response.msg
                         });
                    })
                    .catch((e) => {
                         //snackbar.alert(e.message);
                         resolve({ successful: false, message: e.message });
                    });
          });
     },
};
export { httpOperations };