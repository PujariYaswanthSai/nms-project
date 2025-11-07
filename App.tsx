
import React, { useState, useCallback } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ArchitectureView from './components/ArchitectureView';
import SetupGuideView from './components/SetupGuideView';
import ReportView from './components/ReportView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);

  const renderView = useCallback(() => {
    switch (currentView) {
      case View.Dashboard:
        return <DashboardView />;
      case View.Architecture:
        return <ArchitectureView />;
      case View.SetupGuide:
        return <SetupGuideView />;
      case View.ProjectReport:
        return <ReportView />;
      default:
        return <DashboardView />;
    }
  }, [currentView]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 ml-16 sm:ml-64 transition-all duration-300">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
