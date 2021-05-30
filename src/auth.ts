import { IUser } from "typings/user";

const apiUrl = process.env.REACT_APP_API_URL;
const LOCAL_STORAGE_KEY = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(LOCAL_STORAGE_KEY);

export const handleUserResponse = ({ user }: { user: IUser }) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, user.token ?? "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
    return Promise.reject(data);
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
    return Promise.reject(data);
  });
};

export const logout = async () =>
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
