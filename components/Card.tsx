
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className }) => {
  return (
    <div className={`bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md sm:text-lg font-semibold text-gray-300">{title}</h3>
        <div className="text-cyan-400">{icon}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
