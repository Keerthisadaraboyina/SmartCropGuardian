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

export type FinanceData = {
    crop: string;
    marketPrice: number;
    costOfProduction: number;
    profitability: number;
    priceTrend: number[];
};
