import axios from "axios";

const $host = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/`,
  // baseURL: "http://localhost:3006",
});

$host.defaults.timeout = 15000;

const $authHost = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/`,
});

$authHost.defaults.timeout = 15000;

const authInterceptor = (config) => {
  const token = localStorage.getItem("token");
  config.headers.authorization = `Bearer ${token}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
