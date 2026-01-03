import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { financeData } from '@/lib/data';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function FinancePage() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Crop Finance</h1>
        <p className="text-muted-foreground">
          Analyze market prices, production costs, and profitability for your crops.
        </p>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>
            All prices are per quintal (100 kg). Profitability is the percentage gain over the cost of production.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead className="text-right">Market Price (₹)</TableHead>
                <TableHead className="text-right">Cost of Production (₹)</TableHead>
                <TableHead className="text-right">Profitability (%)</TableHead>
                <TableHead className="text-center">Price Trend (Last 4 Weeks)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financeData.map((item) => (
                <TableRow key={item.crop}>
                  <TableCell className="font-medium">{item.crop}</TableCell>
                  <TableCell className="text-right font-semibold">₹{item.marketPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-right">₹{item.costOfProduction.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={item.profitability > 60 ? 'default' : 'secondary'}>
                      {item.profitability.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-2">
                    {item.priceTrend[3] > item.priceTrend[0] ? <TrendingUp className="h-5 w-5 text-green-600" /> : <TrendingDown className="h-5 w-5 text-destructive" />}
                    <span className="text-xs text-muted-foreground">
                      {item.priceTrend.join(' -> ')}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
