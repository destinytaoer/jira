import { useCallback, useRef, useState } from "react";
import useIsMounted from "./useIsMounted";

interface IState<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: IState<null> = {
  error: null,
  data: null,
  status: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

const useAsync = <D>(
  initialState?: IState<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });
  const isMounted = useIsMounted();
  const retry = useRef<() => void>(() => {});

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        status: "success",
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        data: null,
        status: "error",
        error,
      }),
    []
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 promise 或者 thenable 类型数据");
      }
      retry.current = () => {
        if (runConfig?.retry) run(runConfig?.retry(), runConfig);
      };
      setState((state) => ({ ...state, status: "loading" }));

      return promise
        .then((data) => {
          // 阻止在已卸载组件上赋值
          if (isMounted()) {
            setData(data);
          }
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          } else {
            return error;
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setData, setError]
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    retry: retry.current,
    setData,
    setError,
    ...state,
  };
};

export default useAsync;
