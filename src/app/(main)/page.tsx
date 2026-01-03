import { WeatherSummary } from '@/components/dashboard/weather-summary';
import { WeeklyChart } from '@/components/dashboard/weekly-chart';
import { AiInsights } from '@/components/dashboard/ai-insights';
import {
  currentSensorData,
  weeklySoilMoisture,
} from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="col-span-full">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome, Farmer!</h1>
                <p className="text-muted-foreground">Here's a real-time overview of your farm's conditions.</p>
            </div>
        </div>
        <WeatherSummary data={currentSensorData} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
                <WeeklyChart 
                    data={weeklySoilMoisture}
                    title="Weekly Soil Moisture"
                    description="An overview of soil moisture levels for the past week."
                    dataKey="value"
                    unit="%"
                />
            </div>
            <div className="lg:col-span-3">
                <AiInsights />
            </div>
        </div>
    </div>
  );
}
