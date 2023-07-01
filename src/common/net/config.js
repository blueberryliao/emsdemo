/** @format */

class SetNetConfig {
  constructor(config) {
    this.timeout = 40000;

    /* 本地调试 */
    this.gateWay = " ";
    // this.baseURL = 'http://192.168.37.221:8668/performance'
    this.baseURL = "/dev-api";
    //this.baseURL = 'http://192.168.44.112:8802'; // 变量控制——接口地址
    // this.webURL = 'ws://192.168.0.39:8075/we	bsocket/';
    // this.baseURL = 'http://192.168.43.254:8802';   // 冯帅
    // this.baseURL = 'http://192.168.3.222:8802';   // 刘海
    // this.baseURL = 'http://192.168.249.51:8802';   // 邵晨阳
    //this.baseURL = 'http://172.20.10.5:8802';   // 皓天
    // this.baseURL = 'http://172.20.10.2:8802';   // 博一
  }
}

export default SetNetConfig;
