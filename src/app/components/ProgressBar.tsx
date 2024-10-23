// components/ProgressBar.tsx
'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const CustomProgressBar = () => {
  return (
    <ProgressBar
      height="4px" // Altura de la barra
      color="#fffd00" // Color de la barra
      options={{ showSpinner: false }} // Opciones adicionales
      shallowRouting // Ruteo superficial
    />
  );
};

export default CustomProgressBar;
