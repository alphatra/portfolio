import React, { useEffect, useState } from 'react';

interface Y2KLoaderProps {
  message?: string;
  onLoadComplete?: () => void;
  loadingTime?: number; // in milliseconds
}

export default function Y2KLoader({ 
  message = "Loading...", 
  onLoadComplete,
  loadingTime = 2000 
}: Y2KLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        // Accelerate loading near the end for a more dynamic feel
        const increment = prev < 70 ? 2 : prev < 90 ? 1 : 0.5;
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Add slight delay before completing
          setTimeout(() => {
            setLoadingDone(true);
            if (onLoadComplete) onLoadComplete();
          }, 500);
        }
        
        return newProgress;
      });
    }, loadingTime / 60); // Divide loading time to get smooth animation
    
    return () => clearInterval(interval);
  }, [loadingTime, onLoadComplete]);
  
  if (loadingDone) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black y2k-loader-bg">
      <div className="y2k-loader-container max-w-md w-full p-6 rounded-xl relative">
        {/* Pseudo-window frame with Y2K aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur-[1px]"></div>
        
        <div className="relative z-10 bg-gradient-to-b from-gray-900/90 to-black/90 p-4 rounded-lg border-2 border-white/30">
          {/* Window header */}
          <div className="flex items-center justify-between mb-4 border-b border-white/20 pb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <h3 className="text-white/90 text-xs tracking-wider font-bold">system.exe</h3>
            <div className="w-12"></div> {/* Spacer for alignment */}
          </div>
          
          {/* Loading content */}
          <div className="text-center py-4">
            <div className="mb-6 relative">
              {/* Y2K-style animated computer icon */}
              <div className="relative mx-auto w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse blur-sm opacity-50"></div>
                <div className="absolute inset-2 bg-white rounded-full"></div>
                <div className="absolute inset-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <div className="text-2xl font-bold text-white">@</div>
                </div>
              </div>
              
              {/* Animated loading text */}
              <h2 className="text-white font-bold text-xl mb-2">{message}</h2>
              <p className="text-cyan-300 text-sm mb-4">{`Initializing components... ${Math.round(progress)}%`}</p>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-4 bg-gray-800 rounded-full p-0.5 mb-2 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 flex items-center"
                style={{ width: `${progress}%` }}
              >
                {progress > 20 && (
                  <div className="animate-pulse-fast w-full h-full relative overflow-hidden">
                    <div className="absolute inset-y-0 -left-5 w-10 bg-white/30 transform skew-x-12 animate-shimmer-fast"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Loading details */}
            <div className="mt-4 text-xs text-white/70 font-mono">
              <div className="flex items-center justify-between px-1">
                <span>Memory: OK</span>
                <span>CPU: Active</span>
              </div>
              <div className="mt-1 flex items-center justify-between px-1">
                <span>Connection: Secured</span>
                <span className="animate-blink">⚡</span>
              </div>
            </div>
          </div>
          
          {/* Y2K decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-6 left-6 w-1 h-1 bg-white/70 rounded-full animate-blink"></div>
            <div className="absolute bottom-8 right-8 w-1 h-1 bg-white/70 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define CSS for the component in Layout.astro or a global CSS file:
// This would go in global.css
/*
@keyframes shimmer-fast {
  0% { transform: translateX(-100%) skew-x-12; }
  100% { transform: translateX(400%) skew-x-12; }
}

.animate-shimmer-fast {
  animation: shimmer-fast 1.5s infinite;
}

.animate-pulse-fast {
  animation: pulse 1s infinite;
}

.y2k-loader-bg {
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 40%);
}
*/ 