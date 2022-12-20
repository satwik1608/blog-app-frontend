import jwtDecode from "jwt-decode";
import http from "./httpService";

export async function login(fields) {
  console.log("here");
  console.log(fields);
  const { data } = await http.post("http://localhost:1337/login", fields);

  localStorage.setItem("token", data.token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");

    const User = jwtDecode(token);

    return User;
  } catch {
    return null;
  }
}
