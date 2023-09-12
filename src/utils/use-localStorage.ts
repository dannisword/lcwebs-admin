/**
 * 取得使用者資訊
 * @returns
 */
export function getUserInfo() {
     let data = localStorage.getItem("userInfo");
     if (data != null) {
          return JSON.parse(data);
     }
     return data;
}
/**
 * 設定使用者資訊
 * @param {*} data
 */
export function setUserInfo(data: any) {
     const value = JSON.stringify(data);
     localStorage.setItem("userInfo", value);
}
/**
 * 設定 Token
 * @param {*} token
 */
export function setToken(token: string) {
     localStorage.setItem("accessToken", token);
}
/**
 * 取得 Token
 * @returns
 */
export function getToken() {
     return localStorage.getItem("accessToken");
}
/**
 * 取得 localStorage
 * @param {*} key
 * @returns
 */
export function getStorageItem(key: string) {
     const data = localStorage.getItem(key);
     if (data != null) {
          return JSON.parse(data);
     }
     return data;
}
/**
 * 設定 localStorage
 * @param {*} key
 * @param {*} value
 */
export function setStorageItem(key: string, value: string) {
     const data = JSON.stringify(value);
     localStorage.setItem(key, data);
}
/**
 * 清除 localStorage
 */
export function clearLocalStorage() {
     localStorage.clear();
}
