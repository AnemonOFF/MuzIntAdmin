"use client";

import React, { useState } from "react";
import { Input } from "../input";

export interface DebounceInputProps
  extends React.ComponentProps<typeof Input> {}

const DebounceInput: React.FC<DebounceInputProps> = ({
  value,
  defaultValue,
  onChange,
  ...props
}) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutId) clearTimeout(timeoutId);

    const id = setTimeout(() => {
      if (onChange) onChange(e);
    }, 2000);

    setTimeoutId(id);
  };

  return (
    <Input
      onChange={handleChange}
      defaultValue={value ?? defaultValue}
      {...props}
    />
  );
};

export default React.memo(DebounceInput);
