import axios from 'axios';
const AUTH_URL = "http://localhost:8095/api/auth";

export const login = (user) => axios.post(AUTH_URL + "/login",user);
export const register = (user) => axios.post(AUTH_URL + "/register",user);
export const setToken = (token) => localStorage.setItem("token",token)
export const saveUser = (user) => localStorage.setItem("user",JSON.stringify(user));
export const getUser = () => localStorage.getItem("user");
export const isUserLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user !== null;
}
export const logout = () => {
  localStorage.clear();
}
const getToken = () => localStorage.getItem("token")
axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });