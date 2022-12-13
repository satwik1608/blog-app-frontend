import axios from "axios";

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

export default {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
};
