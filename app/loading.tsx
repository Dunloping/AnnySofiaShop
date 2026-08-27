export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center">
        <div className="h-12 w-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500">Cargando...</p>
      </div>
    </div>
  )
}
