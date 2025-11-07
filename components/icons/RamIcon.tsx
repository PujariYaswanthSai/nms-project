
import React from 'react';

const RamIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
        <line x1="6" y1="11" x2="6" y2="13"></line>
        <line x1="10" y1="11" x2="10" y2="13"></line>
        <line x1="14" y1="11" x2="14" y2="13"></line>
        <line x1="18" y1="11" x2="18" y2="13"></line>
    </svg>
);

export default RamIcon;
