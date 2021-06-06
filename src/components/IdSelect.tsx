import { ComponentProps } from "react";
import { Select } from "antd";
import { Key } from "typings";

type SelectProps = ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "options" | "onChange"> {
  value: Key | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当 isNaN(Number(value)) 为 true 时, 代表选择默认类型
 * 当选择默认类型的时候, onChange 会回调 undefined
 * @param props
 */
const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...rest } = props;

  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...rest}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

export default IdSelect;
