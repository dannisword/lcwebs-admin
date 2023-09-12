import { ElMessage } from 'element-plus';
/**
 * 顯示成功訊息
 * @param {*} message
 * @param {*} duration
 */
export const elMessage = (message: string, duration: number = 3000, type: any) => {
     ElMessage({
          message: message,
          type: type,
          duration: duration,
          showClose: true,
     });
}
/**
 * 顯示成功訊息
 * @param message 
 * @param duration 
 */
export const success = (message: string, duration: number = 3000) => {
     elMessage(message, duration, 'success');
}
/**
 * 顯示警告訊息
 * @param message 
 * @param duration 
 */
export const warning = (message: string, duration: number = 0) => {
     elMessage(message, duration, 'warning');
}
/**
 * 顯示異常訊息
 * @param message 
 * @param duration 
 */
export const error = (message: string, duration: number = 0) => {
     elMessage(message, duration, 'error');
}



