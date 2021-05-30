import useMount from "hooks/useMount";
import { createContext, ReactNode, useContext, useState } from "react";
import { IAuthForm, IUser } from "typings/user";
import { http } from "utils/http";
import * as auth from "../auth";

const initUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext =
  createContext<
    | {
        user: IUser | null;
        login: (form: IAuthForm) => Promise<void>;
        register: (form: IAuthForm) => Promise<void>;
        logout: () => Promise<void>;
      }
    | undefined
  >(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = (form: IAuthForm) => auth.login(form).then(setUser);
  const register = (form: IAuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    initUser().then(setUser);
  });

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }
  return context;
};
