export default function SkeletonLoader() {
  return (
    <div className="flex flex-col md:flex-row gap-5 p-6 glass rounded-2xl border border-white/5 animate-pulse">
      <div className="md:w-1/4 h-32 md:h-auto rounded-xl bg-surface-container-high flex-shrink-0"></div>
      <div className="flex flex-col flex-grow justify-between py-1 w-full">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="h-6 w-24 bg-surface-container-high rounded-full"></div>
            <div className="h-5 w-16 bg-surface-container-high rounded-md"></div>
          </div>
          <div className="h-8 bg-surface-container-high rounded-lg w-3/4 mb-3"></div>
          <div className="h-4 bg-surface-container-high rounded-md w-full mb-2"></div>
          <div className="h-4 bg-surface-container-high rounded-md w-2/3"></div>
        </div>
        <div className="flex justify-between items-center mt-6 pt-5 border-t border-white/5">
          <div className="h-5 w-24 bg-surface-container-high rounded-md"></div>
          <div className="h-5 w-28 bg-surface-container-high rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
