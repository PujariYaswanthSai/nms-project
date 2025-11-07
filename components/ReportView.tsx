
import React from 'react';

const ReportSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 border-b-2 border-cyan-500 pb-2 mb-4">{title}</h2>
        <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">{children}</div>
    </section>
);

const ReportView: React.FC = () => {
    return (
        <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-white">5G Core + NMS Monitoring Dashboard</h1>
                <p className="text-lg text-gray-400 mt-2">End-to-End 5G Core Management Prototype</p>
            </header>

            <ReportSection title="Abstract">
                <p>This project presents a prototype for an end-to-end 5G Core network monitoring and management system. By integrating Free5GC as the 5G Core, UERANSIM for UE/RAN simulation, and a Network Management System (NMS) built with Prometheus and Grafana, this project demonstrates a comprehensive solution for visualizing network health, performance metrics, and fault management in a cloud-native 5G environment. The resulting dashboard provides real-time insights into Network Function (NF) status, resource utilization, user activity, and traffic throughput, offering a foundational tool for network operators.</p>
            </ReportSection>

            <ReportSection title="Introduction">
                <p>The evolution to 5G introduces a Service-Based Architecture (SBA) that is highly flexible, scalable, and complex. This complexity necessitates advanced monitoring solutions to ensure network reliability and performance. This project aims to build a scaled-down but functional prototype of a 5G network environment and integrate it with a modern NMS to provide a "single pane of glass" view for network operations. We explore the setup of core components, UE registration flows, and the real-time collection and visualization of key performance indicators (KPIs).</p>
            </ReportSection>

            <ReportSection title="System Architecture">
                <p>The architecture consists of three main layers:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>5G Core Network:</strong> Implemented using Free5GC, which provides key NFs like AMF, SMF, UPF, NRF, etc.</li>
                    <li><strong>Radio Access Network (RAN) & User Equipment (UE) Simulation:</strong> Provided by UERANSIM, which simulates gNodeB and multiple UEs to generate traffic and control plane signaling.</li>
                    <li><strong>Network Management System (NMS):</strong> Comprises Prometheus for time-series data collection (scraping metrics exposed by NFs) and Grafana for querying Prometheus and visualizing the data in interactive dashboards.</li>
                </ul>
            </ReportSection>

            <ReportSection title="Implementation Steps">
                <p>The implementation followed a structured approach:</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>Environment Setup:</strong> An Ubuntu server was provisioned with necessary dependencies like Go, C++, and MongoDB.</li>
                    <li><strong>Free5GC Deployment:</strong> The Free5GC source code was cloned and all NFs were compiled. Configuration files were modified to set up network identifiers (MCC, MNC) and interface IP addresses.</li>
                    <li><strong>UERANSIM Configuration:</strong> UERANSIM was compiled, and configuration profiles for the gNodeB and UEs were created, ensuring they matched the Free5GC network parameters and security credentials.</li>
                    <li><strong>NMS Integration:</strong> Prometheus was configured to scrape metrics endpoints from the 5G NFs. Grafana was installed, and a data source pointing to Prometheus was added. Dashboards were then built using Grafana's query builder to display relevant metrics.</li>
                    <li><strong>End-to-End Test:</strong> A UE was registered via UERANSIM, a PDU session was established, and connectivity to the data network was verified using tools like ping and iperf.</li>
                </ol>
            </ReportSection>

            <ReportSection title="Dashboard Results & Analysis">
                <p>The Grafana dashboard successfully visualized the following key metrics:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>NF Health:</strong> A panel showing the 'up' or 'down' status of critical NFs (AMF, SMF, UPF), scraped by Prometheus.</li>
                    <li><strong>UE & Session Counts:</strong> Gauges and time-series graphs displaying the number of registered UEs and active PDU sessions.</li>
                    <li><strong>Traffic Throughput:</strong> Graphs showing real-time upload and download speeds, providing insight into user plane performance.</li>
                    <li><strong>Resource Utilization:</strong> CPU and Memory usage for each NF container/process, essential for capacity planning and troubleshooting.</li>
                </ul>
            </ReportSection>

            <ReportSection title="Fault Handling Observations">
                <p>To test fault management, the UPF process was intentionally stopped. The NMS detected this event almost immediately: Prometheus's scrape of the UPF endpoint failed, triggering an alert in Prometheus's Alertmanager. On the Grafana dashboard, the UPF status panel turned red, and related metrics (like throughput) dropped to zero. This successfully demonstrated the NMS's ability to detect and report critical failures, enabling operators to respond quickly.</p>
            </ReportSection>
            
            <ReportSection title="Conclusion & Future Scope">
                <p>This project successfully demonstrates the feasibility of building a powerful, open-source-based 5G Core NMS. The prototype provides essential visibility into a complex SBA environment. Future work could expand on this foundation by:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Log Aggregation:</strong> Integrating a logging stack like ELK (Elasticsearch, Logstash, Kibana) or Loki to centralize logs from all NFs.</li>
                    <li><strong>Automated Remediation:</strong> Using the NMS alerts to trigger automated scripts for restarting failed NFs.</li>
                    <li><strong>Network Slicing Monitoring:</strong> Adding dashboard panels to monitor metrics on a per-slice basis.</li>
                    <li><strong>Advanced Tracing:</strong> Implementing distributed tracing using tools like Jaeger to trace requests across different microservices (NFs).</li>
                </ul>
            </ReportSection>

        </div>
    );
};

export default ReportView;
