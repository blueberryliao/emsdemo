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
        const message = error.response.statusText || "请求错误，请联系管理员";
        // 返回码待商量
        switch (code) {
          case 401: {
            MessageBox("登录已过期, 是否重新登录?", "提示", {
              confirmButtonText: "confirm",
              cancelButtonText: "取消",
              type: "warning",
              center: true,
            })
              .then(() => {
                // 重定向
                location.replace(urlconfig.LOGIN_URL);
              })
              .catch(() => {
                Message({
                  message: "已取消重新登录",
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
              message: "请求方法错误",
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
        throw new error("禁止修改api");
      },
      get(target, property) {
        return target[property];
      },
    });
  }
}
export default Interceptor;
