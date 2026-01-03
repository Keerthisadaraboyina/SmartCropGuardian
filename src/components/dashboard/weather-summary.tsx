import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplets, Wind, CloudRain } from 'lucide-react';
import type { SensorData } from '@/lib/types';

interface SensorCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  unit: string;
  description: string;
}

function SensorCard({ icon: Icon, title, value, unit, description }: SensorCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
          <span className="text-base font-normal">{unit}</span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function WeatherSummary({ data }: { data: SensorData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SensorCard
        icon={Droplets}
        title="Soil Moisture"
        value={data.soilMoisture}
        unit="%"
        description="Optimal range: 40-60%"
      />
      <SensorCard
        icon={Thermometer}
        title="Temperature"
        value={data.temperature}
        unit="°C"
        description="Current ambient temperature"
      />
      <SensorCard
        icon={Wind}
        title="Humidity"
        value={data.humidity}
        unit="%"
        description="Relative humidity level"
      />
      <SensorCard
        icon={CloudRain}
        title="Rainfall"
        value={data.rainfall}
        unit="mm"
        description="In the last 24 hours"
      />
    </div>
  );
}
