import React from 'react';
import { Link } from 'react-router-dom';

type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: LogoSize;
}

const sizeClasses: Record<LogoSize, string> = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl'
};

const taglineSizeClasses: Record<LogoSize, string> = {
  sm: 'text-[11px]',
  md: 'text-xs',
  lg: 'text-sm',
  xl: 'text-base'
};

const spacingClasses: Record<LogoSize, string> = {
  sm: 'space-x-2',
  md: 'space-x-2',
  lg: 'space-x-3',
  xl: 'space-x-4'
};

const circleSizeClasses: Record<LogoSize, { outer: string; middle: string; inner: string; text: string }> = {
  sm: { outer: 'w-10 h-10', middle: 'w-8 h-8', inner: 'w-6 h-6', text: 'text-[11px]' },
  md: { outer: 'w-12 h-12', middle: 'w-10 h-10', inner: 'w-8 h-8', text: 'text-xs' },
  lg: { outer: 'w-14 h-14', middle: 'w-12 h-12', inner: 'w-10 h-10', text: 'text-sm' },
  xl: { outer: 'w-16 h-16', middle: 'w-14 h-14', inner: 'w-12 h-12', text: 'text-base' }
};

export function Logo({ className = '', showTagline = false, size = 'md' }: LogoProps) {
  const containerAlignment = showTagline ? 'items-start text-left' : 'items-start';
  const spacingClass = spacingClasses[size] || spacingClasses.md;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const circleSizes = circleSizeClasses[size] || circleSizeClasses.md;
  const taglineSize = taglineSizeClasses[size] || taglineSizeClasses.md;

  return (
    <Link to="/services" className={`flex flex-col ${containerAlignment} ${className}`}>
      {/* Main Logo */}
      <div className={`flex items-center ${spacingClass} ${sizeClass}`}>
        {/* CBM */}
        <span className="font-bold text-purple-400">CBM</span>
        
        {/* 360° Circle */}
        <div className="relative">
          <div className={`${circleSizes.outer} rounded-full border-2 border-purple-400 flex items-center justify-center`}>
            <div className={`${circleSizes.middle} rounded-full border border-gray-400 flex items-center justify-center`}>
              <div className={`${circleSizes.inner} rounded-full border border-purple-400 flex items-center justify-center`}>
                <span className={`text-gray-600 font-medium ${circleSizes.text}`}>360°</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* TIV™ */}
        <span className="font-bold text-purple-400">
          TIV
          <sup className="text-gray-600 text-xs">™</sup>
        </span>
      </div>
      
      {/* Tagline */}
      {showTagline && (
        <div className={`text-gray-500 font-medium mt-2 tracking-wide ${taglineSize}`}>
          Inspection Integrity Innovation
        </div>
      )}
    </Link>
  );
}
