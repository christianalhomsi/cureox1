'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function NavigationLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const previousPathname = useRef<string>(pathname);
  const isInitialMount = useRef<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      previousPathname.current = pathname;
      isInitialMount.current = false;
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }

    if (pathname !== previousPathname.current) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        previousPathname.current = pathname;
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    // Listen for link clicks to show loader immediately for page navigation only
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]');
      
      if (link) {
        const href = link.getAttribute('href');
        if (href) {
          // Don't show loader for:
          // - Hash links (#about, /#services, etc.) - same page navigation
          // - External links (http/https)
          const isHashLink = href.startsWith('#') || href.startsWith('/#');
          const isExternalLink = href.startsWith('http');
          
          // Only show loader for actual page navigation (different routes)
          if (!isHashLink && !isExternalLink) {
            // Check if it's a different page
            // Handle relative paths
            let targetPath = href;
            if (href.startsWith('/')) {
              // Remove hash if present
              targetPath = href.split('#')[0];
              // Compare with current pathname (without hash)
              const currentPath = pathname.split('#')[0];
              
              // Only show loader if navigating to a different page
              if (targetPath !== currentPath) {
                setIsLoading(true);
              }
            }
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)]/95 backdrop-blur-md transition-opacity duration-300">
      <div className="flex flex-col items-center gap-6">
        {/* Spinning loader with gradient */}
        <div className="relative">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-[#01C4F0] border-r-[#0061A5]"></div>
          <div 
            className="absolute inset-0 h-20 w-20 animate-spin rounded-full border-4 border-transparent border-b-[#01C4F0] border-l-[#0061A5]" 
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          ></div>
          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-[var(--bg-primary)] p-1">
              <Image
                src="/logo/logo.png"
                alt="CureOx Logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
        {/* Loading text */}
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold bg-gradient-to-r from-[#01C4F0] to-[#0061A5] bg-clip-text text-transparent">
            Loading
          </span>
          <div className="flex gap-1">
            <span 
              className="h-1 w-1 rounded-full bg-[#01C4F0] animate-bounce" 
              style={{ animationDelay: '0ms' }}
            ></span>
            <span 
              className="h-1 w-1 rounded-full bg-[#01C4F0] animate-bounce" 
              style={{ animationDelay: '150ms' }}
            ></span>
            <span 
              className="h-1 w-1 rounded-full bg-[#01C4F0] animate-bounce" 
              style={{ animationDelay: '300ms' }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
