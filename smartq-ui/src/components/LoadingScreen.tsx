
export default function SimpleLoader() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block">
          {/* Simple Spinner */}
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          
          {/* Logo/Title */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">QueueSmart</h1>
          </div>
          
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    </div>
  );
}