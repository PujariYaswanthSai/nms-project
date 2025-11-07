import React, { useState, useEffect, useCallback } from 'react';
import { NetworkFunction } from '../types';
import Card from './Card';
import CpuIcon from './icons/CpuIcon';
import RamIcon from './icons/RamIcon';
import UserIcon from './icons/UserIcon';
import SessionIcon from './icons/SessionIcon';
import ThroughputIcon from './icons/ThroughputIcon';
import { getComponentExplanation } from '../services/geminiService';
// FIX: Import DashboardIcon component.
import DashboardIcon from './icons/DashboardIcon';

const initialNFs: NetworkFunction[] = [
  { id: 'amf', name: 'AMF', status: 'UP', cpu: 35, ram: 55 },
  { id: 'smf', name: 'SMF', status: 'UP', cpu: 40, ram: 60 },
  { id: 'upf', name: 'UPF', status: 'UP', cpu: 60, ram: 75 },
  { id: 'nrf', name: 'NRF', status: 'UP', cpu: 20, ram: 30 },
  { id: 'udm', name: 'UDM', status: 'UP', cpu: 25, ram: 40 },
  { id: 'ausf', name: 'AUSF', status: 'UP', cpu: 15, ram: 25 },
];

const StatusIndicator: React.FC<{ status: 'UP' | 'DOWN' | 'DEGRADED' }> = ({ status }) => {
  const color = status === 'UP' ? 'bg-green-500' : status === 'DOWN' ? 'bg-red-500' : 'bg-yellow-500';
  return <span className={`w-3 h-3 rounded-full ${color} mr-2`}></span>;
};

const AIExplanationModal: React.FC<{ componentName: string; onClose: () => void }> = ({ componentName, onClose }) => {
    const [explanation, setExplanation] = useState<string>('Loading explanation...');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExplanation = async () => {
            setIsLoading(true);
            const result = await getComponentExplanation(componentName);
            setExplanation(result.replace(/(\r\n|\n|\r)/gm, "<br>").replace(/\*/g, ''));
            setIsLoading(false);
        };
        fetchExplanation();
    }, [componentName]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-cyan-400">AI Explanation: {componentName}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">&times;</button>
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-48">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
                        </div>
                    ) : (
                        <div className="prose prose-invert text-gray-300" dangerouslySetInnerHTML={{ __html: explanation }} />
                    )}
                </div>
                 <div className="bg-gray-700 px-6 py-3 text-right">
                    <button
                        onClick={onClose}
                        className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


const DashboardView: React.FC = () => {
    const [networkFunctions, setNetworkFunctions] = useState<NetworkFunction[]>(initialNFs);
    const [ueCount, setUeCount] = useState(142);
    const [pduSessions, setPduSessions] = useState(130);
    const [throughput, setThroughput] = useState({ up: 85.3, down: 450.7 });
    const [faults, setFaults] = useState<string[]>([]);
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null);


    const simulateFault = useCallback(() => {
        setNetworkFunctions(prevNFs =>
            prevNFs.map(nf => (nf.id === 'upf' ? { ...nf, status: 'DOWN' } : nf))
        );
        setFaults(prev => [...prev, `CRITICAL: UPF is unreachable at ${new Date().toLocaleTimeString()}`]);
    }, []);

    const resolveFault = useCallback(() => {
        setNetworkFunctions(prevNFs =>
            prevNFs.map(nf => (nf.id === 'upf' ? { ...nf, status: 'UP', cpu: 60, ram: 75 } : nf))
        );
        setFaults([]);
    }, []);

    useEffect(() => {
    const interval = setInterval(() => {
      setNetworkFunctions(prevNFs =>
        prevNFs.map(nf => ({
          ...nf,
          cpu: nf.status === 'UP' ? Math.max(10, Math.min(95, nf.cpu + Math.random() * 4 - 2)) : 0,
          ram: nf.status === 'UP' ? Math.max(20, Math.min(98, nf.ram + Math.random() * 2 - 1)) : 0,
        }))
      );
      setUeCount(c => Math.max(0, c + Math.floor(Math.random() * 6 - 3)));
      setPduSessions(s => Math.max(0, s + Math.floor(Math.random() * 4 - 2)));
      setThroughput(t => ({
        up: Math.max(10, t.up + Math.random() * 10 - 5),
        down: Math.max(50, t.down + Math.random() * 50 - 25),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">NMS Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="UE Registrations" icon={<UserIcon />}>
          <p className="text-4xl font-bold text-white">{ueCount}</p>
          <p className="text-sm text-gray-400">Active Devices</p>
        </Card>
        <Card title="PDU Sessions" icon={<SessionIcon />}>
          <p className="text-4xl font-bold text-white">{pduSessions}</p>
          <p className="text-sm text-gray-400">Established Connections</p>
        </Card>
        <Card title="DL Throughput" icon={<ThroughputIcon />}>
          <p className="text-4xl font-bold text-white">{throughput.down.toFixed(1)} <span className="text-xl">Mbps</span></p>
          <p className="text-sm text-gray-400">Download</p>
        </Card>
        <Card title="UL Throughput" icon={<ThroughputIcon className="transform rotate-180"/>}>
          <p className="text-4xl font-bold text-white">{throughput.up.toFixed(1)} <span className="text-xl">Mbps</span></p>
          <p className="text-sm text-gray-400">Upload</p>
        </Card>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card title="Network Function (NF) Status" icon={<DashboardIcon />}>
                    <div className="space-y-4">
                        {networkFunctions.map(nf => (
                            <div key={nf.id} className="bg-gray-700 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center mb-2 sm:mb-0">
                                    <StatusIndicator status={nf.status} />
                                    <span className="font-bold text-white w-12">{nf.name}</span>
                                    <button
                                        onClick={() => setSelectedComponent(nf.name)}
                                        className="ml-2 text-xs bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-1 px-2 rounded-full transition"
                                    >
                                        AI ?
                                    </button>
                                </div>
                                <div className="flex items-center space-x-4 flex-1 sm:justify-end">
                                    <div className="flex items-center text-sm text-gray-300 w-28">
                                        <CpuIcon className="w-4 h-4 mr-2" />
                                        <span>CPU: {nf.cpu.toFixed(1)}%</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-300 w-28">
                                        <RamIcon className="w-4 h-4 mr-2" />
                                        <span>RAM: {nf.ram.toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
            <div>
                <Card title="Fault & Alarm Monitoring" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}>
                    <div className="space-y-2 mb-4">
                        <button onClick={simulateFault} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition">Simulate UPF Fault</button>
                        <button onClick={resolveFault} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition">Resolve Fault</button>
                    </div>
                    <div className="bg-gray-900 p-3 rounded-lg h-48 overflow-y-auto">
                        {faults.length === 0 ? (
                            <p className="text-green-400 text-sm">No active alarms. System nominal.</p>
                        ) : (
                            faults.map((fault, i) => <p key={i} className="text-red-400 font-mono text-xs mb-1 animate-pulse">{fault}</p>)
                        )}
                    </div>
                </Card>
            </div>
        </div>
        {selectedComponent && <AIExplanationModal componentName={selectedComponent} onClose={() => setSelectedComponent(null)} />}
    </div>
  );
};

export default DashboardView;