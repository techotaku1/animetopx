// app/noticias/loading.tsx
export default function Loading() {
    return (
      <div className="loading-container">
        <p>Cargando...</p>
        <div className="spinner"></div> {/* Aquí podrías poner un spinner o un skeleton loader */}
      </div>
    );
  }
  