import useUrlQueryParam from "hooks/useUrlQueryParam";
import { useMemo } from "react";

const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => [
  "projects",
  useProjectSearchParams()[0],
];

export default useProjectSearchParams;
