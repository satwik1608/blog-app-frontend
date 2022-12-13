import http from "./httpService";

export function getBlogs() {
  return http.get("http://localhost:1337/blogs");
}
