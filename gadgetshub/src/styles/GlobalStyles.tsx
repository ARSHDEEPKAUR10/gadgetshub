import { useEffect } from "react";
import { colors, fonts } from "./Variables";

const GlobalStyles = () => {
  useEffect(() => {
    document.body.style.fontFamily = fonts.main;
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
    document.body.style.lineHeight = "1.6";
  }, []);

  return null;
};

export default GlobalStyles;
