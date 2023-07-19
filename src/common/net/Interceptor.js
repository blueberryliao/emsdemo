import axios from "axios";
import { Message, MessageBox } from "/lib/element-ui/index";
import { error, proxy } from "jquery";
import config from "./config";
import urlconfig from "./urlconfig";
class Interceptor {
  constructor() {
    this.api = axios.create(new config());
    this.setRequestInterceptors();
    this.setResponseInterceptors();
    this.setproxy();
  }
  // 关于localstroge的处理
  getlocalstroge(item) {
    return localStorage.getItem(`${item}`);
  }

  setAuthorization(key, item) {
    localStorage.setItem(key, item);
  }
  // 请求拦截
  setRequestInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const Authorization = this.getlocalstroge();
        if (Authorization) {
          config.headers.Authorization = Authorization; //请求头加上token
        }
        return config;
      },
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );
  }
  //请求响应
  setResponseInterceptors() {
    this.api.interceptors.response.use(
      (res) => {
        return res.data; //统一返回格式？
      },
      (error) => {
        //  返回格式待商量
        const code = Number(error.response.status);
        const message =
          error.response.statusText ||
          "Request error. Please contact the administrator.";
        // 返回码待商量
        switch (code) {
          case 401: {
            MessageBox(
              "Login has expired. Would you like to log in again?",
              "Notification",
              {
                confirmButtonText: "confirm",
                cancelButtonText: "cancel",
                type: "warning",
                center: true,
              }
            )
              .then(() => {
                // 重定向
                location.replace(urlconfig.LOGIN_URL);
              })
              .catch(() => {
                Message({
                  message: "Re-login has been canceled.",
                  type: "info",
                });
              });
            break;
          }
          case 404: {
            Message({
              type: "error",
              message: "page not found",
            });
            break;
          }
          case 405: {
            Message({
              type: "error",
              message: "Incorrect request method.",
            });
            break;
          }
          default: {
            Message({
              type: "error",
              message: error.response.data || message,
            });
            break;
          }
        }
        console.log(error);
        return Promise.reject(error);
      }
    );
  }
  // 设置实列
  setproxy() {
    this._api = new proxy(this.api, {
      set() {
        throw new error("Modifying the API is prohibited.");
      },
      get(target, property) {
        return target[property];
      },
    });
  }
}
export default Interceptor;
