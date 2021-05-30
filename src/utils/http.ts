import qs from "qs";
import * as auth from "auth";
import { useAuth } from "context/authContext";
import { cleanObject } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    url += `?${qs.stringify(cleanObject(data || {}))}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的不同, axios 可以直接在返回状态不为 2xx 时返回异常
  return window.fetch(`${apiUrl}/${url}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();

      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();

  return (...[url, config]: Parameters<typeof http>) =>
    http(url, { ...config, token: user?.token });
};
