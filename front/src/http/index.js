import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "http://localhost:3006",
});

$host.defaults.timeout = 15000;

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

$authHost.defaults.timeout = 15000;

const authInterceptor = (config) => {
  const token = localStorage.getItem("token");
  config.headers.authorization = `Bearer ${token}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

const User = {
  register: async (email, password, username) =>
    await $host.post("api/user/register", {
      email,
      password,
      username,
    }),
  login: async (email, password) =>
    await $host.post("api/user/login", {
      email,
      password,
    }),
  auth: async () => await $authHost.get("api/user/auth", {}),
  dropDb: async () => await $authHost.get("api/user/dropdb", {}),
};
const Mark = {
  fetch: async () => await $host.get("api/tag", {}),
};

const Purchase = {
  create: async (purchase) => await $authHost.post("api/purchase", purchase),
  update: async (id, purchase) =>
    await $authHost.put(`api/purchase/${id}`, purchase),
  delete: async (id) => await $authHost.delete(`api/purchase/${id}`),
  fetch: async (freqId, needId) =>
    await $host.get("api/purchase", {
      params: {
        freqId,
        needId,
      },
    }),
};

export default { User, Purchase, Mark };
