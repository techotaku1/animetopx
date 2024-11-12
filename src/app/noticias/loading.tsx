// app/noticias/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="animate-spin w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full"></div>
      <span>Cargando...</span>
    </div>
  );
}
