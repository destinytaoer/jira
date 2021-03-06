import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import useAsync from "hooks/useAsync";
import useMount from "hooks/useMount";
import { createContext, ReactNode, useContext } from "react";
import { useQueryClient } from "react-query";
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
  const {
    data: user,
    run,
    isIdle,
    isLoading,
    isError,
    error,
    setData: setUser,
  } = useAsync<IUser | null>();
  const queryClient = useQueryClient();

  const login = (form: IAuthForm) => auth.login(form).then(setUser);
  const register = (form: IAuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  useMount(() => {
    run(initUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

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
