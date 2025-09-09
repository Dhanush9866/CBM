import React from 'react';

interface LoadingAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const lineWidthClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const insetClasses = {
    sm: {
      first: 'inset-0',
      second: 'inset-1',
      third: 'inset-2',
      fourth: 'inset-3'
    },
    md: {
      first: 'inset-0',
      second: 'inset-1',
      third: 'inset-2',
      fourth: 'inset-3'
    },
    lg: {
      first: 'inset-0',
      second: 'inset-2',
      third: 'inset-4',
      fourth: 'inset-6'
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Rotating line container */}
      <div className={`relative ${lineWidthClasses[size]}`}>
        {/* Rotating line */}
        <div 
          className={`absolute ${insetClasses[size].first} border-2 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin`}
          style={{
            animationDuration: '1s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        />
        
        {/* Inner rotating line (counter-rotation for effect) */}
        <div 
          className={`absolute ${insetClasses[size].second} border-2 border-transparent border-b-red-500 border-l-red-500 rounded-full animate-spin`}
          style={{
            animationDuration: '1.5s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDirection: 'reverse'
          }}
        />
        
        {/* Third rotating line */}
        <div 
          className={`absolute ${insetClasses[size].third} border-2 border-transparent border-t-green-500 border-r-green-500 rounded-full animate-spin`}
          style={{
            animationDuration: '2s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        />
        
        {/* Fourth rotating line (counter-rotation) */}
        <div 
          className={`absolute ${insetClasses[size].fourth} border-2 border-transparent border-b-purple-500 border-l-purple-500 rounded-full animate-spin`}
          style={{
            animationDuration: '2.5s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDirection: 'reverse'
          }}
        />
        
        {/* Center text */}
        <div className={`absolute inset-0 flex items-center justify-center ${textSizeClasses[size]} font-semibold text-gray-500 animate-pulse`}
             style={{ padding: size === 'sm' ? '10px' : size === 'md' ? '14px' : '18px' }}>
          360
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
