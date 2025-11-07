
export enum View {
  Dashboard = 'DASHBOARD',
  Architecture = 'ARCHITECTURE',
  SetupGuide = 'SETUP_GUIDE',
  ProjectReport = 'PROJECT_REPORT',
}

export interface NetworkFunction {
  id: string;
  name: string;
  status: 'UP' | 'DOWN' | 'DEGRADED';
  cpu: number;
  ram: number;
}
