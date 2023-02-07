import jwtDecode from "jwt-decode";
import http, { debug } from "./httpService";
import Cookies from "js-cookie";

// const url = "https://shiny-ox-leotard.cyclic.app";
const url = "http://localhost:1337";
export function getJwt() {
  return localStorage.getItem("token");
}

http.setJwt(getJwt());

export async function login(fields) {
  const { data } = await http.post(`${url}/login`, fields);

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
