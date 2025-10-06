import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showTagline = false, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const taglineSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <Link to="/services" className={`flex flex-col items-start ${className}`}>
      {/* Main Logo */}
      <div className={`flex items-center space-x-2 ${sizeClasses[size]}`}>
        {/* CBM */}
        <span className="font-bold text-purple-400">CBM</span>
        
        {/* 360° Circle */}
        <div className="relative">
          <div className="w-12 h-12 md:w-14 md:h-14 lg:w-14 lg:h-14 rounded-full border-2 border-purple-400 flex items-center justify-center">
            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 rounded-full border border-gray-400 flex items-center justify-center">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full border border-purple-400 flex items-center justify-center">
                <span className="text-gray-600 text-xs md:text-sm lg:text-l font-medium">360°</span>
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
        <div className={`text-gray-600 font-medium mt-1 ${taglineSizeClasses[size]}`}>
          Inspection Integrity Innovation
        </div>
      )}
    </Link>
  );
}
