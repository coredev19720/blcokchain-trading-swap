import { useEffect, useRef } from "react";

export const usePreviousValue = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
