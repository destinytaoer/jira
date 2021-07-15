export const isFalsy = (value: any) => (value === 0 ? false : !value);
export const isVoid = (value: any) =>
  value === undefined || value === null || value === "";

/** 清除对象中的空值 */
export function cleanObject(obj: { [key: string]: any }) {
  const result = { ...obj };

  Object.keys(result).forEach(key => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
}

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
