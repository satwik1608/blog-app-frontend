import http from "./httpService";

export function getBlogs() {
  return http.get("http://localhost:1337/blogs");
}

export function getAuthor(id) {
  return http.get(`http://localhost:1337/author/${id}`);
}
