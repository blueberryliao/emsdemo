import Interceptor from "./Interceptor";
import Handledataa from "./handledataa";
import Qs from "qs";
import axios from "axios";
import { Message, MessageBox } from "/lib/element-ui/index";
import { error, proxy } from "jquery";
import config from "./config";
import urlconfig from "./urlconfig";
import router from "@/router/index";
import { authWhiteList } from "./const";
import _ from "lodash";
import { docCookies } from "@/common/js/CookieUtil";
let handledataa = new Handledataa();
let time = ""; // 计时器

class Request {
  constructor() {
    this.api = axios.create(new config());
    this.setRequestInterceptors();
    this.setResponseInterceptors();
    this.setproxy();
  }
  //
  // 关于localstroge的处理
  getlocalstroge(item) {
    return localStorage.getItem(`${item}`);
  }

  setAuthorization(key, item) {
    localStorage.setItem(key, item);
    Authorization: "Bearer " + docCookies.getItem("token");
  }
  // 请求拦截
  setRequestInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        console.log("config", config);
        if (!config.url.includes("/iplatform-bi/")) {
          let token = sessionStorage.getItem("token");
          if (!token) {
            token = docCookies.getItem("token");
          }
          const Authorization = "Bearer " + token;
          if (token) {
            if (!_.includes(authWhiteList, config.url)) {
              if (!config.isNotToken)
                config.headers.Authorization = Authorization;
            }
            if (!config.fobbidenGateway) {
              // config.baseURL = config.baseURL + config.gateWay;
              config.baseURL = config.baseURL;
            }
            // user服务正式与测试区分
            /* if (config.gateWay == "/iplatform-submit" && config.url.indexOf('iplatform-user') != '-1') {
              config.url = config.url.replace('iplatform-user', 'iplatform-userT')
            } */
          }
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
        // return (res = {
        //   data: res.data,
        //   status: res.status,
        //   headers:res.headers
        // });
        return res.data;
      },
      (error) => {
        //  返回格式待商量
        const code =
          Number(error && error.response && error.response.status) || 5000;
        // const code = Number(error.response.status) || 5000
        const message =
          (error && error.response && error.response.statusText) ||
          "请求错误，请联系管理员";
        // 返回码待商量
        switch (code) {
          case 400: {
            break;
          }
          case 401: {
            if (time) {
              clearTimeout(time);
            }
            time = setTimeout(() => {
              sessionStorage.clear();
              docCookies.clear();
              Message({
                type: "error",
                message: "授权已过期，请重新登录！",
              });
              let _arr = docCookies.keys();
              _arr &&
                _arr.forEach((item) => {
                  if (item.indexOf("bs_") === -1) {
                    sessionStorage.removeItem(item);
                    docCookies.removeItem(item);
                  }
                });
              router.push("/login");
            }, 300);
            break;
          }
          case 404: {
            Message({
              type: "error",
              message: "您访问的资源不存在！",
            });
            break;
          }
          case 405: {
            /* Message({
              type: 'error',
              message: '请求方法错误'
            }) */
            break;
          }
          case 500: {
            break;
          }
          default: {
            if (time) {
              clearTimeout(time);
            }
            time = setTimeout(() => {
              Message({
                type: "error",
                // message:error && error.response && error.response.data.msg || message,
                message: "服务器报错，请联系管理员！",
              });
            }, 300);

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
  //
  async request(params) {
    let url = params.url;
    let reqparams = [];
    // if (
    //   params.method === "delete" &&
    //   !(params && params.config && params.config.headers)
    // )
    //   url += `${handledataa.getPathParams((params && params.data) || {})}`;
    if (
      (params.method === "get" &&
        !(params && params.config && params.config.headers)) ||
      (params.method === "delete" &&
        !(params && params.config && params.config.headers))
    )
      url += `${handledataa.getQueryParams((params && params.data) || {})}`;
    if (params?.path === "path")
      url += `${handledataa.getPathParams((params && params.data) || {})}`;
    reqparams.push(url);
    //   if(params?.isformdata) url.url += `${handledataa.getQueryParams(requestParams.query)}`
    // reqparams = [url]
    // console.log(params.method === 'post' || params.method === 'put');
    if (
      (params.method === "post" &&
        !(params && params.config && params.config.headers)) ||
      (params.method === "put" &&
        !(params && params.config && params.config.headers))
    ) {
      if (params.data) {
        reqparams.push(Qs.stringify(params.data));
      } else {
        reqparams.push(null);
      }
    } else if (params.method === "post" || params.method === "put") {
      if (params.data) {
        reqparams.push(params.data);
      } else {
        reqparams.push(null);
      }
    }
    if (!!params.config) {
      reqparams.push(params.config);
    }

    // const [res, err] = await this.api[params.method](...reqparams)
    // if (err) return Promise.reject (err);
    // return Promise.resolve (res.data);
    const res = await this.api[params.method](...reqparams);
    // console.log({reqparams})
    // console.log({ res });
    // console.log(reqparams);
    return Promise.resolve(res);
  }
  async send(params) {
    return this.request(params);
  }
}
export default Request;
