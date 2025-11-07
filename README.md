# 5G Core + NMS Monitoring Dashboard Prototype

This project is a sophisticated frontend prototype that demonstrates a Network Management System (NMS) dashboard for a 5G Core network. It is designed to be a visually structured, easy-to-understand, and comprehensive tool suitable for a final-year engineering project presentation or as an educational resource for learning about 5G architecture.

The application simulates a real-time monitoring environment, provides detailed architectural diagrams, offers a complete setup guide for a lab environment, and includes a pre-written project report.

## Key Features

- **Interactive Dashboard**: Simulates real-time monitoring of key 5G network metrics, including:
  - UE (User Equipment) registration counts.
  - Active PDU (Packet Data Unit) sessions.
  - Uplink and Downlink traffic throughput.
  - Resource utilization (CPU/RAM) for each Network Function (NF).
- **Fault & Alarm Simulation**: Interactively simulate a network fault (e.g., UPF failure) and observe how the NMS dashboard reports the alarm in real-time.
- **AI-Powered Explanations**: Integrates with the **Google Gemini API** to provide clear, on-demand explanations of complex 5G network functions (AMF, SMF, UPF, etc.) directly within the UI.
- **System Architecture Visuals**: Includes beautifully rendered diagrams for:
  - The overall 5G System Architecture, showing how NFs interact.
  - The UE Attach and PDU Session Setup sequence flow.
- **Comprehensive Setup Guide**: Provides step-by-step installation commands and sample configuration files for setting up a real 5G lab environment using **Free5GC**, **UERANSIM**, **Prometheus**, and **Grafana** on an Ubuntu system.
- **Viva-Ready Project Report**: A complete, well-structured project report covering abstract, introduction, architecture, implementation, results, and conclusion, ready for academic review.

## How It Works

This is a standalone frontend application built with React. It **simulates** the data from a 5G core network for demonstration purposes.

- **Data Simulation**: The dashboard metrics are generated and updated client-side using `setInterval` to mimic a live data feed from a real NMS. It does not connect to an actual Free5GC or Prometheus backend.
- **AI Integration**: The "AI ?" buttons trigger a live API call to the Google Gemini API. The application sends a specially crafted prompt asking for an explanation of the selected 5G component, and then displays the markdown response in a modal.

## Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Build Tool**: Vite (or similar, as assumed by the development environment)

## Steps to Execute (Local Development)

To run this project on your local machine, follow these steps:

### 1. Prerequisites

- **Node.js and npm**: Ensure you have a recent version of Node.js and npm (or yarn) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).
- **Google Gemini API Key**: You need an API key from Google AI Studio to use the AI explanation feature. You can get one for free [here](https://aistudio.google.com/app/apikey).

### 2. Installation

Clone the repository to your local machine:
```bash
git clone <repository-url>
cd <project-directory>
```

Install the required npm packages:
```bash
npm install
```

### 3. Environment Configuration

The application requires your Google Gemini API key to be set as an environment variable.

1.  Create a new file named `.env` in the root directory of the project.
2.  Add your API key to this file as follows:

    ```
    API_KEY=YOUR_GEMINI_API_KEY
    ```

    Replace `YOUR_GEMINI_API_KEY` with your actual key.

**Note**: If the API key is not provided, the core application will still run, but attempting to use the "AI ?" feature will result in an error alert.

### 4. Running the Application

Start the local development server:
```bash
npm start
```

This will launch the application, and you can view it in your web browser, typically at `http://localhost:3000`.
