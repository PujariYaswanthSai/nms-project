
import React, { useState } from 'react';

const DiagramBox: React.FC<{ title: string, className?: string }> = ({ title, className }) => (
  <div className={`border-2 border-cyan-400 bg-gray-800 rounded-lg p-3 text-center shadow-lg ${className}`}>
    <span className="font-bold text-white text-xs sm:text-sm">{title}</span>
  </div>
);

const Arrow: React.FC<{ from: string; to: string; label: string; className?: string }> = ({ label, className }) => (
    <div className={`absolute text-center ${className}`}>
        <div className="text-cyan-300 text-[10px] sm:text-xs font-mono">{label}</div>
        <div className="relative text-cyan-300">
            <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                <line x1="0" y1="10" x2="100" y2="10" stroke="currentColor" strokeWidth="2" />
                <polygon points="95,5 100,10 95,15" fill="currentColor" />
            </svg>
        </div>
    </div>
);

const SystemArchitectureDiagram = () => (
    <div className="relative p-4 bg-gray-900 rounded-lg overflow-x-auto min-w-[700px]">
        <div className="grid grid-cols-12 gap-y-12 items-center">
            {/* Row 1 */}
            <DiagramBox title="UE" className="col-start-1 col-span-2" />
            <div className="col-start-3 col-span-1 h-0 border-t-2 border-cyan-400 border-dashed"></div>
            <DiagramBox title="gNodeB (RAN)" className="col-start-4 col-span-2" />
            <div className="col-start-6 col-span-1 h-0 border-t-2 border-cyan-400 border-dashed"></div>
            <DiagramBox title="AMF" className="col-start-7 col-span-2" />
            <div className="col-start-9 col-span-1 h-0 border-t-2 border-cyan-400 border-dashed"></div>
            <DiagramBox title="AUSF" className="col-start-10 col-span-2" />
             <div className="col-start-12 col-span-1 relative">
                <div className="absolute top-1/2 left-0 w-full h-0 border-t-2 border-cyan-400 border-dashed"></div>
                <div className="absolute top-0 left-1/2 w-0 h-full border-l-2 border-cyan-400 border-dashed"></div>
             </div>
            {/* Row 2 */}
            <div className="col-start-7 col-span-2 flex justify-center items-center">
                <div className="w-0 h-12 border-l-2 border-cyan-400 border-dashed"></div>
            </div>
            <div className="col-start-10 col-span-2 flex justify-center items-center">
                <div className="w-0 h-12 border-l-2 border-cyan-400 border-dashed"></div>
            </div>
             <DiagramBox title="UDM" className="col-start-11 col-span-2" />
            {/* Row 3 */}
            <DiagramBox title="SMF" className="col-start-7 col-span-2" />
            <div className="col-start-9 col-span-1 h-0 border-t-2 border-cyan-400 border-dashed"></div>
            <DiagramBox title="UPF" className="col-start-10 col-span-2" />

             {/* Row 4 */}
            <div className="col-start-7 col-span-2 flex justify-center items-center">
                <div className="w-0 h-12 border-l-2 border-cyan-400 border-dashed"></div>
            </div>
             <div className="col-start-4 col-span-2 flex justify-center items-center">
                <div className="w-0 h-24 border-l-2 border-cyan-400 border-dashed"></div>
            </div>
             <DiagramBox title="Data Network (Internet)" className="col-start-10 col-span-3" />
            
            {/* Row 5 */}
             <DiagramBox title="NRF" className="col-start-7 col-span-2" />
             <DiagramBox title="NSSF" className="col-start-4 col-span-2" />
        </div>
        <div className="absolute text-cyan-200 text-xs font-mono" style={{top: '5%', left: '21%'}}>N1</div>
        <div className="absolute text-cyan-200 text-xs font-mono" style={{top: '5%', left: '46%'}}>N2</div>
        <div className="absolute text-cyan-200 text-xs font-mono" style={{top: '5%', left: '71%'}}>N8</div>
        <div className="absolute text-cyan-200 text-xs font-mono" style={{top: '46%', left: '71%'}}>N11</div>
        <div className="absolute text-cyan-200 text-xs font-mono" style={{top: '46%', left: '92%'}}>N4</div>
    </div>
);

const SequenceDiagram = () => (
    <div className="p-4 bg-gray-900 rounded-lg overflow-x-auto min-w-[600px] text-xs sm:text-sm">
        <div className="flex justify-around mb-4">
            {['UE', 'gNodeB', 'AMF', 'AUSF/UDM', 'SMF'].map(item => (
                <div key={item} className="w-24 text-center font-bold">{item}</div>
            ))}
        </div>
        <div className="relative">
            {/* Lifelines */}
            <div className="flex justify-around">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-24 flex justify-center">
                        <div className="w-px h-96 bg-gray-600"></div>
                    </div>
                ))}
            </div>
            {/* Messages */}
            <Arrow from="UE" to="gNodeB" label="1. RRC Setup Request" className="w-[18%] top-2 left-[5%]" />
            <Arrow from="gNodeB" to="AMF" label="2. Registration Request" className="w-[18%] top-10 left-[25%]" />
            <Arrow from="AMF" to="AUSF/UDM" label="3. Authentication" className="w-[18%] top-20 left-[45%]" />
            <Arrow from="AUSF/UDM" to="AMF" label="4. Auth Success" className="w-[18%] top-28 left-[45%] transform -scale-x-100" />
            <Arrow from="AMF" to="gNodeB" label="5. Security Mode Cmd" className="w-[18%] top-36 left-[25%] transform -scale-x-100" />
            <Arrow from="gNodeB" to="UE" label="6. Security Mode Complete" className="w-[18%] top-44 left-[5%] transform -scale-x-100" />
            <Arrow from="AMF" to="SMF" label="7. PDU Session Est. Request" className="w-[18%] top-56 left-[65%]" />
            <Arrow from="SMF" to="AMF" label="8. PDU Session Est. Accept" className="w-[18%] top-64 left-[65%] transform -scale-x-100" />
            <Arrow from="AMF" to="UE" label="9. PDU Session Est. Accept" className="w-[38%] top-72 left-[5%] transform -scale-x-100" />
             <Arrow from="UE" to="AMF" label="10. PDU Session Est. Complete" className="w-[38%] top-80 left-[5%]" />
        </div>
    </div>
);


const ArchitectureView: React.FC = () => {
    const [activeTab, setActiveTab] = useState('system');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">System Architecture</h1>
            <div className="bg-gray-800 p-2 rounded-lg flex space-x-2">
                <button
                    onClick={() => setActiveTab('system')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === 'system' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                    System Architecture
                </button>
                 <button
                    onClick={() => setActiveTab('sequence')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === 'sequence' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                    Sequence Flow
                </button>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
                {activeTab === 'system' && <SystemArchitectureDiagram />}
                {activeTab === 'sequence' && <SequenceDiagram />}
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">5G Core Network Functions Explained</h2>
                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                    <p><strong>AMF (Access and Mobility Management Function):</strong> Manages UE registration, connection, reachability, and mobility. It's the primary point of contact for the UE within the 5G Core.</p>
                    <p><strong>SMF (Session Management Function):</strong> Responsible for session management, including session establishment, modification, and release. It allocates IP addresses to UEs and selects the UPF for data traffic.</p>
                    <p><strong>UPF (User Plane Function):</strong> The data plane component. It handles packet routing and forwarding, packet inspection, and policy enforcement for user traffic.</p>
                    <p><strong>NRF (Network Repository Function):</strong> A central repository of all Network Functions in the 5G Core. It supports service discovery, allowing NFs to find and communicate with each other.</p>
                    <p><strong>UDM (Unified Data Management):</strong> Stores and manages user subscription data, including authentication credentials and user profiles.</p>
                    <p><strong>AUSF (Authentication Server Function):</strong> Performs authentication of the UE.</p>
                    <p><strong>NSSF (Network Slice Selection Function):</strong> Selects the appropriate Network Slice Instance for a UE based on requested services.</p>
                </div>
            </div>
        </div>
    );
};

export default ArchitectureView;
