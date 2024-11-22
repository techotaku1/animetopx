export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <span className="text-lg font-semibold text-gray-700">Cargando...</span>
      </div>
    </div>
  );
}

