
import React from 'react';

const ThroughputIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
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
        <path d="M17 21v-4a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v4"></path>
        <path d="M12 16V8"></path>
        <path d="m15 11-3-3-3 3"></path>
        <path d="M7 3v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3"></path>
        <path d="M12 8V4"></path>
        <path d="m9 7 3-3 3 3"></path>
    </svg>
);

export default ThroughputIcon;
