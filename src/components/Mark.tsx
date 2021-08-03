import React from "react";

interface IMarkProps {
  name: string;
  keyword: string;
}

export const Mark = ({ name, keyword }: IMarkProps) => {
  if (!keyword) {
    return <>{name}</>;
  }

  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257AF0" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
