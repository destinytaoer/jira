import { useState } from "react";

const useArray = <T>(initValue: T[]) => {
  const [array, setArray] = useState(initValue);

  return {
    array,
    add: (item: T) => setArray((array) => [...array, item]),
    removeByIndex: (index: number) =>
      setArray((array) => array.filter((_, i) => i !== index)),
    // removeById: (id: string) =>
    //   setArray((array) => array.filter((item) => item?.id !== id)),
  };
};

export default useArray;
