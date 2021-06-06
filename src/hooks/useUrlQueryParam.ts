import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    useCallback(
      (params: Partial<{ [key in K]: unknown }>) => {
        const obj = cleanObject({
          ...Object.fromEntries(searchParams),
          ...params,
        }) as URLSearchParams;
        setSearchParam(obj);
      },
      [searchParams, setSearchParam]
    ),
  ] as const;
};

export default useUrlQueryParam;
