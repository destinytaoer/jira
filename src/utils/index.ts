export const isFalsy = (value: any) => (value === 0 ? false : !value);

/** 清除对象中的空值 */
export function cleanObject(obj: { [key: string]: any }) {
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });

  return result;
}
