import type { SensorData, WeeklyChartData } from '@/lib/types';

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
  { value: 'wheat', label: 'Wheat' },
  { value: 'corn', label: 'Corn' },
  { value: 'rice', label: 'Rice' },
  { value: 'potato', label: 'Potato' },
  { value: 'tomato', label: 'Tomato' },
];

export const locations = [
    { value: 'central_valley_ca', label: 'Central Valley, CA' },
    { value: 'midwest_ia', label: 'Midwest, IA' },
    { value: 'nile_delta_egypt', label: 'Nile Delta, Egypt' },
    { value: 'punjab_india', label: 'Punjab, India' },
];
