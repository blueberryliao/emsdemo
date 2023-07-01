import { param } from "jquery";

class Handledataa {
  // query
  getQueryParams(params) {
    // console.log(params);
    let keysList = Object.keys(params);
    let queryParams = "?";
    for (let key of keysList) {
      if (!!params[key] || params[key] == null || params[key] == undefined)
        queryParams += `${key}=${params[key]}&`;
    }
    // console.log(queryParams);
    return queryParams.slice(0, queryParams.length - 1);
  }
  // path
  getPathParams(params) {
    let pathParams = "";
    if (Array.isArray(params)) {
      for (let v of params) {
        pathParams += `/${v}`;
      }
    } else if (params instanceof Object) {
      let keysList = Object.keys(params);
      // console.log(params);
      for (let key of keysList) {
        pathParams += `/${params[key]}`;
      }
    } else {
      pathParams += `/${params}`;
    }
    return pathParams;
  }
}

export default Handledataa;
