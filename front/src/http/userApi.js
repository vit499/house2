import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

const register = async (email, password, username) => {
  // try {
  const { data } = await $host.post("api/user/register", {
    email,
    password,
    username,
  });
  return data;
  // } catch (err) {}
};

const login = async (email, password) => {
  // try {
  const { data } = await $host.post("api/user/login", { email, password });
  // console.log("data", data);
  const u = jwtDecode(data.token);
  localStorage.setItem("token", data.token);
  return u;
  // } catch (err) {}
};

const checkAuth = async () => {
  try {
    console.log("[get] checkAuth");
    const { data } = await $authHost.get("api/user/auth", {});
    console.log("data check", data);
    const u = await jwtDecode(data.token);
    await localStorage.setItem("token", data.token);
    return u;
  } catch (err) {
    // console.log("check auth err", err);
  }
};

const dropDb = async () => {
  try {
    console.log("[get] dropdb");
    const { data } = await $authHost.get("api/user/dropdb", {});
    console.log("drop", data);
    return data;
  } catch (err) {
    // console.log("check auth err", err);
  }
};

export { register, login, checkAuth, dropDb };
