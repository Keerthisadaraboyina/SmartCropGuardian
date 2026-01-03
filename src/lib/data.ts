import type { SensorData, WeeklyChartData, FinanceData } from '@/lib/types';

export const currentSensorData: SensorData = {
  soilMoisture: 45,
  temperature: 22,
  humidity: 68,
  rainfall: 5,
};

export const weeklySoilMoisture: WeeklyChartData = [
  { date: 'Mon', value: 55 },
  { date: 'Tue', value: 52 },
  { date: 'Wed', value: 53 },
  { date: 'Thu', value: 48 },
  { date: 'Fri', value: 45 },
  { date: 'Sat', value: 42 },
  { date: 'Sun', value: 45 },
];

export const weeklyTemperature: WeeklyChartData = [
  { date: 'Mon', value: 20 },
  { date: 'Tue', value: 21 },
  { date: 'Wed', value: 23 },
  { date: 'Thu', value: 24 },
  { date: 'Fri', value: 22 },
  { date: 'Sat', value: 21 },
  { date: 'Sun', value: 22 },
];

export const weeklyHumidity: WeeklyChartData = [
  { date: 'Mon', value: 70 },
  { date: 'Tue', value: 68 },
  { date: 'Wed', value: 65 },
  { date: 'Thu', value: 63 },
  { date: 'Fri', value: 68 },
  { date: 'Sat', value: 72 },
  { date: 'Sun', value: 68 },
];

export const weeklyRainfall: WeeklyChartData = [
  { date: 'Mon', value: 0 },
  { date: 'Tue', value: 10 },
  { date: 'Wed', value: 2 },
  { date: 'Thu', value: 0 },
  { date: 'Fri', value: 5 },
  { date: 'Sat', value: 15 },
  { date: 'Sun', value: 5 },
];

export const cropTypes = [
  { value: 'rice', label: 'Rice' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'cotton', label: 'Cotton' },
  { value: 'sugarcane', label: 'Sugarcane' },
  { value: 'maize', label: 'Maize' },
  { value: 'millets', label: 'Millets' },
  { value: 'pulses', label: 'Pulses' },
  { value: 'jute', label: 'Jute' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'tea', label: 'Tea' },
  { value: 'soybean', label: 'Soybean' },
  { value: 'groundnut', label: 'Groundnut' },
];

export const locations = [
  { value: 'punjab', label: 'Punjab' },
  { value: 'haryana', label: 'Haryana' },
  { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
  { value: 'madhya_pradesh', label: 'Madhya Pradesh' },
  { value: 'west_bengal', label: 'West Bengal' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
  { value: 'tamil_nadu', label: 'Tamil Nadu' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'assam', label: 'Assam' },
];

export const financeData: FinanceData[] = [
  { crop: 'Rice', marketPrice: 2000, costOfProduction: 1200, profitability: 66.7, priceTrend: [1900, 1950, 2000, 2050] },
  { crop: 'Wheat', marketPrice: 1800, costOfProduction: 1100, profitability: 63.6, priceTrend: [1750, 1780, 1800, 1820] },
  { crop: 'Cotton', marketPrice: 5500, costOfProduction: 3500, profitability: 57.1, priceTrend: [5400, 5450, 5500, 5550] },
  { crop: 'Sugarcane', marketPrice: 300, costOfProduction: 180, profitability: 66.7, priceTrend: [290, 295, 300, 305] },
  { crop: 'Maize', marketPrice: 1500, costOfProduction: 900, profitability: 66.7, priceTrend: [1450, 1480, 1500, 1520] },
  { crop: 'Millets', marketPrice: 2200, costOfProduction: 1300, profitability: 69.2, priceTrend: [2100, 2150, 2200, 2250] },
  { crop: 'Pulses', marketPrice: 6000, costOfProduction: 4000, profitability: 50.0, priceTrend: [5900, 5950, 6000, 6050] },
  { crop: 'Jute', marketPrice: 4000, costOfProduction: 2800, profitability: 42.9, priceTrend: [3900, 3950, 4000, 4050] },
  { crop: 'Coffee', marketPrice: 7000, costOfProduction: 4500, profitability: 55.6, priceTrend: [6800, 6900, 7000, 7100] },
  { crop: 'Tea', marketPrice: 300, costOfProduction: 180, profitability: 66.7, priceTrend: [290, 295, 300, 305] },
];
