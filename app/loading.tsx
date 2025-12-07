export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)] backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Spinning loader with gradient */}
        <div className="relative">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-[#01C4F0] border-r-[#0061A5]"></div>
          <div className="absolute inset-0 h-20 w-20 animate-spin rounded-full border-4 border-transparent border-b-[#01C4F0] border-l-[#0061A5]" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          {/* Center logo or dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#01C4F0] to-[#0061A5] animate-pulse"></div>
          </div>
        </div>
        {/* Loading text */}
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold bg-gradient-to-r from-[#01C4F0] to-[#0061A5] bg-clip-text text-transparent">
            Loading
          </span>
          <div className="flex gap-1">
            <span className="h-1 w-1 rounded-full bg-[#01C4F0] animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="h-1 w-1 rounded-full bg-[#01C4F0] animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="h-1 w-1 rounded-full bg-[#01C4F0] animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

