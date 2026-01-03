'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Plus, Sparkles } from 'lucide-react';
import { predictProfitAction } from '@/lib/actions';
import { cropTypes, financeData } from '@/lib/data';
import type { PredictProfitInput, PredictProfitOutput } from '@/ai/schemas/predict-profit-schema';

const costItemSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  amount: z.coerce.number().min(0.01, 'Amount must be positive'),
});

const costFormSchema = z.object({
  costs: z.array(costItemSchema),
});

type CostFormValues = z.infer<typeof costFormSchema>;

function SubmitButton({ children }: { children: React.ReactNode }) {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Analyzing...' : children}
      </Button>
    );
  }

function ProfitPrediction({ totalCost, cropType }: { totalCost: number, cropType: string }) {
    const { toast } = useToast();
    const initialState = { success: false, data: null, error: null };
    const [state, dispatch] = useActionState(predictProfitAction, initialState);

    useEffect(() => {
        if (state.error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.error,
            });
        }
    }, [state, toast]);

    const marketPrice = financeData.find(c => c.crop.toLowerCase() === cropType)?.marketPrice || 0;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-accent" /> AI Profit Prediction
          </CardTitle>
          <CardDescription>
            Get an AI-powered profit forecast based on your costs and market data.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form action={dispatch} className="space-y-4">
                <input type="hidden" name="cropType" value={cropType} />
                <input type="hidden" name="totalCost" value={totalCost} />
                <input type="hidden" name="marketPrice" value={marketPrice} />
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <label className="text-sm font-medium">Crop</label>
                        <p className="p-2 rounded-md border bg-muted">{cropType}</p>
                    </div>
                     <div className="flex flex-col space-y-1.5">
                        <label className="text-sm font-medium">Total Cost (₹)</label>
                        <p className="p-2 rounded-md border bg-muted">{totalCost.toLocaleString()}</p>
                    </div>
                </div>

                <SubmitButton>Predict Profit</SubmitButton>
            </form>
            {state.data && (
                <div className="mt-6 space-y-3">
                    <h3 className="font-semibold text-lg">Prediction Results:</h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Predicted Profit (₹)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-primary">₹{state.data.predictedProfit.toLocaleString()}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Profit Margin</CardTitle>
                            </CardHeader>
                             <CardContent>
                                <p className="text-2xl font-bold text-primary">{state.data.predictedProfitMargin.toFixed(1)}%</p>
                            </CardContent>
                        </Card>
                    </div>
                     <p className="text-sm text-muted-foreground pt-2">{state.data.recommendation}</p>
                </div>
            )}
        </CardContent>
      </Card>
    );
}

export default function CostTrackingPage() {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const methods = useForm<CostFormValues>({
    resolver: zodResolver(costFormSchema),
    defaultValues: {
      costs: [{ category: '', amount: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'costs',
  });

  const { watch } = methods;
  const costs = watch('costs');
  const totalCost = costs.reduce((acc, cost) => acc + (cost.amount || 0), 0);

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Cost Tracking Dashboard
        </h1>
        <p className="text-muted-foreground">
          Log and manage your farm expenses to predict profitability.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-5 mt-6">
        <div className="md:col-span-3">
          <FormProvider {...methods}>
            <form>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Log Expenses</CardTitle>
                        <CardDescription>
                            Add expenses for the selected crop.
                        </CardDescription>
                    </div>
                    <div className="w-1/3">
                        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Crop"/>
                            </SelectTrigger>
                            <SelectContent>
                                {cropTypes.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount (₹)</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fields.map((field, index) => (
                        <TableRow key={field.id}>
                          <TableCell>
                            <Input
                              {...methods.register(`costs.${index}.category`)}
                              placeholder="e.g. Seeds, Fertilizer"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              {...methods.register(`costs.${index}.amount`)}
                              className="text-right"
                              placeholder="0.00"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => append({ category: '', amount: 0 })}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Expense
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-end font-bold text-lg">
                  Total Cost: ₹{totalCost.toLocaleString()}
                </CardFooter>
              </Card>
            </form>
          </FormProvider>
        </div>
        <div className="md:col-span-2">
            <ProfitPrediction totalCost={totalCost} cropType={selectedCrop} />
        </div>
      </div>
    </>
  );
}
