import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET", // by default
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // standard format
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  // 反引号是ES6特性模板字符串，可以通过${}传入变量
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "Please sign in again" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        // fetch不会主动针对401/500抛出异常
        // 需要自己抛出一个异常
        // 注：axios可以直接在status不为2xx时抛出异常
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  // Todo TS操作符
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
