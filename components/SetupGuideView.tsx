
import React, { useState } from 'react';
import CodeBlock from './CodeBlock';

const setupContent = {
  prerequisites: `
# Update and install dependencies
sudo apt update
sudo apt install -y mongodb git golang-1.18-go gcc g++ make cmake autoconf libtool pkg-config libmnl-dev libyaml-dev
`,
  free5gc: `
# Clone the Free5GC repository
git clone --recursive -b v3.4.1 -j \`nproc\` https://github.com/free5gc/free5gc.git
cd free5gc

# Compile network functions
make
`,
  ueransim: `
# Clone UERANSIM repository
git clone https://github.com/aligungr/UERANSIM
cd UERANSIM

# Install dependencies
sudo apt-get install -y make g++ openvpn libsctp-dev lksctp-tools

# Compile
make
`,
  prometheus: `
# Download Prometheus
wget https://github.com/prometheus/prometheus/releases/download/v2.51.2/prometheus-2.51.2.linux-amd64.tar.gz
tar xvfz prometheus-*.tar.gz
cd prometheus-*

# Start Prometheus with the config file
./prometheus --config.file=prometheus.yml
`,
  grafana: `
# Install Grafana
sudo apt-get install -y apt-transport-https'
sudo apt-get install -y software-properties-common wget
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt-get update
sudo apt-get install grafana

# Start Grafana server
sudo systemctl daemon-reload
sudo systemctl start grafana-server
sudo systemctl enable grafana-server.service
`
};

const configContent = {
    free5gc: `
# amfcfg.yaml
configuration:
  amfName: AMF
  ngapIpList:
    - 127.0.0.1
  sbi:
    scheme: http
    ...
  servedGuamiList:
    - plmnId:
        mcc: "208"
        mnc: "93"
      amfId: cafe00
  ...
`,
    ueransim_gnb: `
# gnb.yaml
mcc: '208'
mnc: '93'
nci: '0x000000010'
idLength: 32
tac: 1
linkIp: 127.0.0.1
ngapIp: 127.0.0.1
gtpIp: 127.0.0.1
amfConfigs:
  - address: 127.0.0.1
    port: 38412
...
`,
    ueransim_ue: `
# ue.yaml
supi: 'imsi-208930000000003'
msin: '0000000003'
key: '8baf473f2f8fd09487cccbd7097c6862'
op: '8e27b6af0e692e750f32667a3b14605d'
opType: OPc
amf: '8000'
imei: '356938035643803'
...
`,
    prometheus: `
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'free5gc'
    static_configs:
      - targets: ['localhost:9090'] # Default Prometheus endpoint
  - job_name: 'amf'
    static_configs:
      - targets: ['localhost:29518'] # Example AMF metrics endpoint
  - job_name: 'smf'
    static_configs:
      - targets: ['localhost:29502']
  - job_name: 'upf'
    static_configs:
      - targets: ['localhost:29507']
`
};

const Accordion: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }> = ({ title, children, isOpen, onToggle }) => (
    <div className="border-b border-gray-700">
        <h2>
            <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-300 hover:bg-gray-700"
                onClick={onToggle}
            >
                <span>{title}</span>
                 <svg className={`w-3 h-3 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
        </h2>
        <div className={`p-5 border-t border-gray-600 ${isOpen ? '' : 'hidden'}`}>
            {children}
        </div>
    </div>
);

const SetupGuideView: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string>('prerequisites');

    const handleToggle = (id: string) => {
        setOpenAccordion(openAccordion === id ? '' : id);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Setup & Installation Guide</h1>
            
            <div className="bg-gray-800 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-cyan-400 p-5">Installation Commands (Ubuntu)</h2>
                 <Accordion title="1. System Prerequisites" isOpen={openAccordion === 'prerequisites'} onToggle={() => handleToggle('prerequisites')}>
                    <CodeBlock language="bash">{setupContent.prerequisites}</CodeBlock>
                </Accordion>
                <Accordion title="2. Free5GC Installation" isOpen={openAccordion === 'free5gc'} onToggle={() => handleToggle('free5gc')}>
                    <CodeBlock language="bash">{setupContent.free5gc}</CodeBlock>
                </Accordion>
                 <Accordion title="3. UERANSIM Installation" isOpen={openAccordion === 'ueransim'} onToggle={() => handleToggle('ueransim')}>
                    <CodeBlock language="bash">{setupContent.ueransim}</CodeBlock>
                </Accordion>
                <Accordion title="4. Prometheus Installation" isOpen={openAccordion === 'prometheus'} onToggle={() => handleToggle('prometheus')}>
                    <CodeBlock language="bash">{setupContent.prometheus}</CodeBlock>
                </Accordion>
                <Accordion title="5. Grafana Installation" isOpen={openAccordion === 'grafana'} onToggle={() => handleToggle('grafana')}>
                    <CodeBlock language="bash">{setupContent.grafana}</CodeBlock>
                </Accordion>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg">
                 <h2 className="text-2xl font-bold text-cyan-400 p-5">Sample Configurations</h2>
                <Accordion title="Free5GC Config (amfcfg.yaml)" isOpen={openAccordion === 'config_free5gc'} onToggle={() => handleToggle('config_free5gc')}>
                    <CodeBlock language="yaml">{configContent.free5gc}</CodeBlock>
                </Accordion>
                 <Accordion title="UERANSIM gNodeB Config (gnb.yaml)" isOpen={openAccordion === 'config_gnb'} onToggle={() => handleToggle('config_gnb')}>
                    <CodeBlock language="yaml">{configContent.ueransim_gnb}</CodeBlock>
                </Accordion>
                 <Accordion title="UERANSIM UE Config (ue.yaml)" isOpen={openAccordion === 'config_ue'} onToggle={() => handleToggle('config_ue')}>
                    <CodeBlock language="yaml">{configContent.ueransim_ue}</CodeBlock>
                </Accordion>
                 <Accordion title="Prometheus Config (prometheus.yml)" isOpen={openAccordion === 'config_prometheus'} onToggle={() => handleToggle('config_prometheus')}>
                    <CodeBlock language="yaml">{configContent.prometheus}</CodeBlock>
                </Accordion>
            </div>
        </div>
    );
};

export default SetupGuideView;
