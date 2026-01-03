import { TrendsChart } from '@/components/analytics/trends-chart';
import {
  weeklySoilMoisture,
  weeklyTemperature,
  weeklyHumidity,
  weeklyRainfall,
} from '@/lib/data';

export default function AnalyticsPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Analytics</h1>
      </div>
      <p className="text-muted-foreground">
        Visualize weekly trends for weather and soil conditions.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-6">
        <TrendsChart
          data={weeklyTemperature}
          title="Weekly Temperature"
          description="Average daily temperature over the last 7 days."
          dataKey="value"
          unit="°C"
          color="hsl(var(--chart-2))"
        />
        <TrendsChart
          data={weeklyHumidity}
          title="Weekly Humidity"
          description="Average daily relative humidity over the last 7 days."
          dataKey="value"
          unit="%"
          color="hsl(var(--chart-1))"
        />
        <TrendsChart
          data={weeklySoilMoisture}
          title="Weekly Soil Moisture"
          description="Average daily soil moisture readings over the last 7 days."
          dataKey="value"
          unit="%"
          color="hsl(var(--chart-3))"
        />
        <TrendsChart
          data={weeklyRainfall}
          title="Weekly Rainfall"
          description="Total daily rainfall over the last 7 days."
          dataKey="value"
          unit="mm"
          color="hsl(var(--chart-4))"
        />
      </div>
    </>
  );
}
