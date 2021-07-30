import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cleanObject, subset } from "utils";

const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParam = useSetUrlSearchParam();

  const [stateKeys] = useState(keys);

  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    useCallback(
      (params: Partial<{ [key in K]: unknown }>) => {
        return setSearchParam(params);
      },
      [setSearchParam]
    ),
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return useCallback(
    (params: { [key in string]: unknown }) => {
      const obj = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParams;
      setSearchParam(obj);
    },
    [searchParams, setSearchParam]
  );
};

export default useUrlQueryParam;
