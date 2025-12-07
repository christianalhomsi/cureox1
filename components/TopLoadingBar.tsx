'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TopLoadingBar() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    setProgress(30);

    const timer1 = setTimeout(() => setProgress(70), 100);
    const timer2 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-1">
      <div
        className="h-full bg-gradient-to-r from-[#01C4F0] to-[#0061A5] transition-all duration-300 ease-out shadow-lg shadow-[#01C4F0]/50"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
