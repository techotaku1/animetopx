// components/ProgressBar.tsx
"use client";

import {AppProgressBar as ProgressBar} from "next-nprogress-bar";

const CustomProgressBar = () => {
  return (
    <ProgressBar
      shallowRouting // Ruteo superficial
      color="#fffd00" // Color de la barra
      height="4px" // Altura de la barra
      options={{showSpinner: false}} // Opciones adicionales
    />
  );
};

export default CustomProgressBar;
