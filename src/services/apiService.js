import http from "./httpService";
import jsCookie from "js-cookie";

export function getBlogs() {
  return http.get("http://localhost:1337/blogs");
}

export function getAuthorId(author) {
  return http.get(`http://localhost:1337/author?name=${author}`);
}
export function getAuthor(id) {
  return http.get(`http://localhost:1337/author/${id}`);
}
export function listAuthor(search) {
  return http.get(`http://localhost:1337/authors?search=${search}`);
}
export function createAuthor(author) {
  return http.post(`http://localhost:1337/author`, author);
}
export function updateAuthor(id, author) {
  return http.put(`http://localhost:1337/author/${id}`, author);
}

export function getBlog(id) {
  return http.get(`http://localhost:1337/blogs/${id}`);
}

export function editBlog(blog, id) {
  return http.put(`http://localhost:1337/blogs/${id}`, blog);
}

export function createComment(comment) {
  jsCookie.set("jwt", localStorage.getItem("token"), { path: "/" });
  return http.post(`http://localhost:1337/comments`, comment);
}

export function getComment() {
  return http.get("http://localhost:1337/comments");
}

export function updateComment(comment, id) {
  return http.put(`http://localhost:1337/comments/${id}`, comment);
}
