import { ChartData, ChartOptions, ChartType, ChartTypeRegistry, DefaultDataPoint } from 'chart.js';

export interface IDashboardResult<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown,
> {
  type: 'text' | keyof ChartTypeRegistry;
  title: string;
  options?: ChartOptions;
  data: ChartData<TType, TData, TLabel> | string;
}
