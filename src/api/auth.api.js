import api from "./axios.api";

export const signup = (data) =>
  api.post("/users/signup", data);

export const signin = (data) =>
  api.post("/users/signin", data);

export const signout = () =>
  api.post("/users/signout");

export const forgetPassword = (data) =>
  api.post("/users/forgetPassword", data);

export const resetPassword = (data) =>
  api.post("/users/resetPassword", data);
