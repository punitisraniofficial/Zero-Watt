import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Reusable wrapper that triggers fade-in, slide-in, pop-in, etc.
 * when scrolled into the browser viewport.
 */
export default function ScrollReveal({
  children,
  animation = 'slide-up', // 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'fade-in', 'pop-in'
  delay = 0,
  className = '',
  as: Component = 'div',
  triggerOnce = true,
  threshold = 0.12,
  ...props
}) {
  const [ref, isVisible] = useScrollReveal({ triggerOnce, threshold });

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    switch (animation) {
      case 'slide-up':
        return 'animate-slide-up';
      case 'slide-down':
        return 'animate-slide-down';
      case 'slide-left':
        return 'animate-slide-left';
      case 'slide-right':
        return 'animate-slide-right';
      case 'pop-in':
        return 'animate-pop';
      case 'fade-in':
      default:
        return 'animate-fade-in';
    }
  };

  const delayClass = delay ? `delay-${delay}` : '';

  return (
    <Component
      ref={ref}
      className={`${getAnimationClass()} ${delayClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
