// ArrowButtons.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Si no la tienes, instálala con `npm install lucide-react`

// Función que genera las chispas
const createSparkle = (e: React.MouseEvent) => {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  const x = e.clientX;
  const y = e.clientY;

  // Posiciona la chispa donde ocurre el evento
  sparkle.style.left = `${x - 5}px`;
  sparkle.style.top = `${y - 5}px`;

  // Agrega la chispa al cuerpo del documento
  document.body.appendChild(sparkle);

  // Elimina la chispa después de la animación
  setTimeout(() => {
    sparkle.remove();
  }, 600); // 600ms, que es la duración de la animación
};

const ArrowButtons = () => {
  return (
    <div className="relative">
      {/* Flecha hacia atrás */}
      <button
        onClick={() => console.log("Prev")}
        className="flecha absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-300 ease-in-out"
        aria-label="Anterior"
        onMouseMove={createSparkle} // Agrega el efecto de chispa
      >
        <ChevronLeft size={24} />
      </button>

      {/* Flecha hacia adelante */}
      <button
        onClick={() => console.log("Next")}
        className="flecha absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-300 ease-in-out"
        aria-label="Siguiente"
        onMouseMove={createSparkle} // Agrega el efecto de chispa
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ArrowButtons;
