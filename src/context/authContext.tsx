import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import useAsync from "hooks/useAsync";
import useMount from "hooks/useMount";
import { ReactNode } from "react";
import { IAuthForm, IUser } from "typings/user";
import { http } from "utils/http";
import * as auth from "../auth";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, AppThunk } from "store";

export const initUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, isIdle, isLoading, isError, error } = useAsync<IUser | null>();
  const dispatch = useDispatch<(...args: unknown[]) => Promise<IUser | null>>();

  useMount(() => {
    run(dispatch(authStore.init()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch = useDispatch<(...args: unknown[]) => Promise<IUser | null>>();
  const user = useSelector(authStore.selectUser);

  const login = useCallback(
    (form: IAuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: IAuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
