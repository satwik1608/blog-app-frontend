import axios from "axios";

import Cookies from "js-cookie";
axios.interceptors.response.use(null, (error) => {
  const expected =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expected) {
    return Promise.reject(error);
  }

  return Promise.reject(error);
});

export function setJwt(jwt) {
  // Cookies.set("jwt", jwt);
  axios.defaults.headers.common["x-auth-token"] = jwt;
  // console.log("axios", axios.defaults.headers.common["x-auth-token"]);
}
export function debug() {
  console.log("axios-debug", axios.defaults.headers.common["x-auth-token"]);
}
export default {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  debug,
};
