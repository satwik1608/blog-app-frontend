import http from "./httpService";

export function getBlogs() {
  return http.get("http://localhost:1337/blogs");
}

export function getAuthor(id) {
  return http.get(`http://localhost:1337/author/${id}`);
}

export function getBlog(id) {
  return http.get(`http://localhost:1337/blogs/${id}`);
}

export function createComment(comment) {
  return http.post(`http://localhost:1337/comments`, comment);
}

export function getComment() {
  return http.get("http://localhost:1337/comments");
}

export function updateComment(comment, id) {
  return http.put(`http://localhost:1337/comments/${id}`, comment);
}
