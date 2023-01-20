import http from "./httpService";
import jsCookie from "js-cookie";
import { isFocusable } from "@testing-library/user-event/dist/utils";

export function getBlogs() {
  return http.get("http://localhost:1337/blogs");
}
export function getBlogImage(id) {
  return http.get(`http://localhost:1337/blogImage/${id}`);
}
export function getAuthorId(author) {
  return http.get(`http://localhost:1337/author?name=${author}`);
}
export function getAuthor(id) {
  return http.get(`http://localhost:1337/author/${id}`);
}
export function listAuthor(search) {
  if (search) return http.get(`http://localhost:1337/authors?search=${search}`);

  return http.get(`http://localhost:1337/authors`);
}
export function createAuthor(author) {
  return http.post(`http://localhost:1337/author`, author);
}
export function updateAuthor(id, author, func) {
  if (func)
    return http.put(`http://localhost:1337/author/${id}?use=${func}`, author);
  return http.put(`http://localhost:1337/author/${id}`, author);
}

export function follow(follower, followee) {
  return http.post(`http://localhost:1337/follow/${followee}`, follower);
}
export function unFollow(follower, followee) {
  return http.post(`http://localhost:1337/unfollow/${followee}`, follower);
}

export function createBlog(blog) {
  console.log(blog);
  return http.post(`http://localhost:1337/blogs`, blog);
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

export function uploadImage(image) {
  const formData = new FormData();

  formData.append("testImage", image.testImage);

  formData.append("name", image.name);

  return http.post("http://localhost:1337/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
