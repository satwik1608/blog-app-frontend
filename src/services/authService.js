import jwtDecode from "jwt-decode";
import http, { debug } from "./httpService";
import Cookies from "js-cookie";

export function getJwt() {
  return localStorage.getItem("token");
}

http.setJwt(getJwt());

export async function login(fields) {
  const { data } = await http.post("http://localhost:1337/login", fields);

  localStorage.setItem("token", data.token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const token = getJwt("token");

    const User = jwtDecode(token);

    return User;
  } catch {
    return null;
  }
}
