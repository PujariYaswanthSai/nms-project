
import React from 'react';
import { View } from '../types';
import DashboardIcon from './icons/DashboardIcon';
import ArchitectureIcon from './icons/ArchitectureIcon';
import SetupIcon from './icons/SetupIcon';
import ReportIcon from './icons/ReportIcon';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  view: View;
  currentView: View;
  setCurrentView: (view: View) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ view, currentView, setCurrentView, icon, label }) => {
  const isActive = currentView === view;
  return (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-cyan-500 text-white'
          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
      aria-label={label}
    >
      {icon}
      <span className="ml-4 text-sm font-medium hidden sm:inline">{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="fixed top-0 left-0 h-full bg-gray-800 text-white w-16 sm:w-64 shadow-lg transition-all duration-300 z-10">
      <div className="flex flex-col h-full p-2">
        <div className="flex items-center justify-center sm:justify-start p-3 mb-4">
           <svg className="w-8 h-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 12l-4 4M16 8l-4 4"/></svg>
          <h1 className="text-xl font-bold ml-2 hidden sm:inline">5G NMS</h1>
        </div>
        <nav className="flex-1">
          <NavItem
            view={View.Dashboard}
            currentView={currentView}
            setCurrentView={setCurrentView}
            icon={<DashboardIcon className="w-5 h-5" />}
            label="Dashboard"
          />
          <NavItem
            view={View.Architecture}
            currentView={currentView}
            setCurrentView={setCurrentView}
            icon={<ArchitectureIcon className="w-5 h-5" />}
            label="Architecture"
          />
          <NavItem
            view={View.SetupGuide}
            currentView={currentView}
            setCurrentView={setCurrentView}
            icon={<SetupIcon className="w-5 h-5" />}
            label="Setup Guide"
          />
          <NavItem
            view={View.ProjectReport}
            currentView={currentView}
            setCurrentView={setCurrentView}
            icon={<ReportIcon className="w-5 h-5" />}
            label="Project Report"
          />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
