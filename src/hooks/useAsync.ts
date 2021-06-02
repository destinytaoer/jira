import { useState } from "react";

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

  const setData = (data: D) =>
    setState({
      data,
      status: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      data: null,
      status: "error",
      error,
    });

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 promise 或者 thenable 类型数据");
    }

    setState({ ...state, status: "loading" });

    return promise
      .then((data) => {
        setData(data);
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
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    setData,
    setError,
    ...state,
  };
};

export default useAsync;
