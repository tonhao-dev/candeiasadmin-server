import { ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js';

export interface IDashboardResult {
  type: 'text' | keyof ChartTypeRegistry;
  title: string;
  options?: ChartOptions;
  data: ChartData | string;
}
