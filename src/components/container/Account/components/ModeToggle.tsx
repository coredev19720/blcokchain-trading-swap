import { Button } from "@mui/material";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from "@mui/material/styles";
import { useEffect, useState } from "react";
const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const toggle = () => {
    console.log(mode);
    setMode(mode === "light" ? "dark" : "light");
  };
  if (!mounted) return null;
  return (
    <Button onClick={toggle}>{mode === "light" ? "Dark" : "Light"}</Button>
  );
};
export default ModeToggle;
