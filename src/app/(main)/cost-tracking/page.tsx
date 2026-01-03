'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
import { Trash2, Plus } from 'lucide-react';
import { cropTypes } from '@/lib/data';

const costItemSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  amount: z.coerce.number().min(0.01, 'Amount must be positive'),
});

const costFormSchema = z.object({
  costs: z.array(costItemSchema),
});

type CostFormValues = z.infer<typeof costFormSchema>;

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
          Log and manage your farm expenses.
        </p>
      </div>

      <div className="mt-6">
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
    </>
  );
}
