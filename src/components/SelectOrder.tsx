import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const SelectOrder = ({
  onChange,
}: {
  onChange: (selection: string) => void;
}) => (
  <Select.Root onValueChange={onChange} defaultValue="lightness">
    <Select.Trigger className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-black shadow-sm shadow-black/10 hover:bg-mauve3 focus:shadow-sm focus:shadow-black outline-none">
      <Select.Value />
      <Select.Icon className="">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white  cursor-default">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <SelectItem
            className={`data-[highlighted]:bg-black data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-red-500 data-[highlighted]:via-green-500  data-[highlighted]:to-purple-500 `}
            value="hue"
          >
            Hue
          </SelectItem>
          <SelectItem
            className={`data-[highlighted]:bg-black data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-gray-500   data-[highlighted]:to-red-500 `}
            value="saturation"
          >
            Saturation
          </SelectItem>
          <SelectItem
            className={`data-[highlighted]:bg-black data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-black  data-[highlighted]:to-white `}
            value="lightness"
          >
            Lightness
          </SelectItem>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={
          "text-[13px] leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-nonek data-[highlighted]:text-white " +
          className
        }
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectOrder;
