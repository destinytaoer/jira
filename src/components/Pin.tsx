import { Rate } from "antd";
import { ComponentProps } from "react";

interface PinProps extends ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Pin = (props: PinProps) => {
  const { checked, onCheckedChange } = props;

  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(num !== 0)}
    />
  );
};

export default Pin;
