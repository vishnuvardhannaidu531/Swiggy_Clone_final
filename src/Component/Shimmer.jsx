function Shimmer() {
  return (
    <div className="w-[90%] sm:w-[88%] mx-auto mt-6 sm:mt-10 mb-10">
      <div className="h-6 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gray-200 h-36 sm:h-40 w-full"></div>
            <div className="p-3 space-y-2">
              <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
              <div className="flex gap-2 items-center">
                <div className="bg-gray-200 h-3 w-8 rounded"></div>
                <div className="bg-gray-200 h-3 w-16 rounded"></div>
              </div>
              <div className="bg-gray-200 h-3 w-2/3 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shimmer;
