import axios from "axios";
import { USER_SERVER } from "../components/Config";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .post(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    payload: request,
  };
}
