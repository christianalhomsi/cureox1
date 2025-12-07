'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseScrollAnimationReturn<T extends HTMLElement> {
  ref: RefObject<T>;
  isVisible: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn<T> {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: ref as RefObject<T>, isVisible };
}

// Animation variants for different effects
export const animationVariants = {
  fadeIn: 'animate-fade-in',
  fadeInUp: 'animate-fade-in-up',
  fadeInDown: 'animate-fade-in-down',
  fadeInLeft: 'animate-fade-in-left',
  fadeInRight: 'animate-fade-in-right',
  scaleIn: 'animate-scale-in',
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
} as const;

export type AnimationVariant = keyof typeof animationVariants;

// Helper function to get animation class with delay
export function getAnimationClass(
  variant: AnimationVariant,
  isVisible: boolean,
  delay?: number
): string {
  const baseClass = isVisible ? animationVariants[variant] : 'opacity-0';
  const delayClass = delay ? `animation-delay-${delay}` : '';
  return `${baseClass} ${delayClass}`.trim();
}

// Stagger animation helper for lists
export function getStaggeredDelay(index: number, baseDelay: number = 100): number {
  return index * baseDelay;
}

export default useScrollAnimation;

