import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { FormControl } from "./form";
import { Calendar } from "./calendar";

export interface DatePickerProps {
  trigger: React.ReactNode;
}

const DatePicker: React.FC<
  DatePickerProps & React.ComponentProps<typeof Calendar>
> = ({ trigger, ...props }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>{trigger}</FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar {...props} />
      </PopoverContent>
    </Popover>
  );
};

export default React.memo(DatePicker);
