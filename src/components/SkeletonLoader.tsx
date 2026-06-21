export default function SkeletonLoader() {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-5 bg-white rounded-2xl border border-gray-100 animate-pulse">
      <div className="md:w-1/4 h-40 rounded-xl bg-gray-100"></div>
      <div className="flex flex-col flex-grow justify-between py-1">
        <div>
          <div className="w-16 h-6 bg-gray-100 rounded-md mb-4"></div>
          <div className="w-3/4 h-6 bg-gray-100 rounded-md"></div>
          <div className="w-1/2 h-6 bg-gray-100 rounded-md mt-2"></div>
        </div>
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
          <div className="w-16 h-4 bg-gray-100 rounded-md"></div>
          <div className="w-24 h-4 bg-gray-100 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
