export type SensorData = {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  rainfall: number;
};

export type ChartDataPoint = {
  date: string;
  [key: string]: number | string;
};

export type WeeklyChartData = ChartDataPoint[];
