import { useCallback, useRef, useReducer } from "react";
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const isMounted = useIsMounted();

  return useCallback(
    (...args: T[]) => {
      isMounted() ? dispatch(...args) : void 0;
    },
    [dispatch, isMounted]
  );
};

const useAsync = <D>(
  initialState?: IState<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: IState<D>, action: Partial<IState<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  const retry = useRef<() => void>(() => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        status: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        data: null,
        status: "error",
        error,
      }),
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 promise 或者 thenable 类型数据");
      }
      retry.current = () => {
        if (runConfig?.retry) run(runConfig?.retry(), runConfig);
      };
      safeDispatch({ status: "loading" });

      return promise
        .then(data => {
          // 阻止在已卸载组件上赋值
          setData(data);
          return data;
        })
        .catch(error => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          } else {
            return error;
          }
        });
    },
    [setData, setError, safeDispatch, config.throwOnError]
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
