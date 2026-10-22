import React from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBorder?: boolean;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 'md',
  showBorder = false
}) => {
  const sizeMap = {
    xs: 'w-6 h-7',
    sm: 'w-9 h-11',
    md: 'w-12 h-14 sm:w-14 sm:h-16',
    lg: 'w-16 h-20 sm:w-20 sm:h-24',
    xl: 'w-24 h-28 sm:w-28 sm:h-32'
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      <img
        src="/assets/school-logo.svg"
        alt="विद्या भारती - सा विद्या या विमुक्तये (पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय)"
        className={`w-full h-full object-contain ${
          showBorder ? 'drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]' : 'drop-shadow-sm'
        }`}
        loading="eager"
      />
    </div>
  );
};
