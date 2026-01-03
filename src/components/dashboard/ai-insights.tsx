'use client';

import React, { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { AlertCircle, Bot, Leaf, Sparkles, Droplets, Shield, Syringe } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

import {
  generateCropGuidanceAction,
  predictPestOutbreaksAction,
} from '@/lib/actions';
import type { PredictPestOutbreaksOutput } from '@/ai/flows/predict-pest-outbreaks';
import { cropTypes, locations } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Analyzing...' : children}
    </Button>
  );
}

function PestPrediction({ onPredictionComplete }: { onPredictionComplete: (data: PredictPestOutbreaksOutput) => void }) {
    const { toast } = useToast();
    const initialState = { success: false, data: null, error: null };
    const [state, dispatch] = useFormState(predictPestOutbreaksAction, initialState);

    useEffect(() => {
        if(state.error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.error,
            });
        }
        if (state.success && state.data) {
            onPredictionComplete(state.data);
        }
    }, [state, toast, onPredictionComplete]);

  return (
    <form action={dispatch}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-accent" /> Pest & Disease Prediction
          </CardTitle>
          <CardDescription>
            Select your crop and location to get an AI-powered risk assessment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select name="cropType" required>
              <SelectTrigger>
                <SelectValue placeholder="Select Crop Type" />
              </SelectTrigger>
              <SelectContent>
                {cropTypes.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value}>
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select name="location" required>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {state.data && (
            <div className="space-y-4 pt-4">
                <Alert variant={state.data.pestRiskLevel === 'high' || state.data.diseaseRiskLevel === 'high' ? 'destructive' : 'default'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>AI Risk Analysis</AlertTitle>
                    <AlertDescription className="space-y-2">
                        <p>Pest Risk: <span className="font-bold">{state.data.pestRiskLevel}</span></p>
                        <p>Disease Risk: <span className="font-bold">{state.data.diseaseRiskLevel}</span></p>
                        <div className="pt-2">
                            <p className="font-semibold text-foreground">Recommended Actions:</p>
                            <p>{state.data.recommendedActions}</p>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                            <label className="text-xs">Confidence:</label>
                            <Progress value={state.data.confidenceScore * 100} className="w-[60%]" />
                            <span>{Math.round(state.data.confidenceScore * 100)}%</span>
                        </div>
                    </AlertDescription>
                </Alert>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton>Predict Risk</SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
}

function CropGuidance({ predictionResult }: { predictionResult: PredictPestOutbreaksOutput | null }) {
    const { toast } = useToast();
    const initialState = { success: false, data: null, error: null };
    const [state, dispatch] = useFormState(generateCropGuidanceAction, initialState);

    useEffect(() => {
        if(state.error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.error,
            });
        }
    }, [state, toast]);

    return (
        <form action={dispatch}>
            {predictionResult && (
                <>
                    <input type="hidden" name="pestRisk" value={predictionResult.pestRiskLevel} />
                    <input type="hidden" name="diseaseRisk" value={predictionResult.diseaseRiskLevel} />
                </>
            )}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bot className="text-accent" /> Actionable Crop Guidance</CardTitle>
                    <CardDescription>Get personalized recommendations for your crop based on current conditions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Select name="cropType" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Crop Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {cropTypes.map((crop) => (
                                <SelectItem key={crop.value} value={crop.value}>{crop.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {state.data && (
                        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger><Droplets className="h-4 w-4 mr-2 text-primary" />Irrigation</AccordionTrigger>
                                <AccordionContent>{state.data.irrigationRecommendation}</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger><Syringe className="h-4 w-4 mr-2 text-destructive" />Pest Control</AccordionTrigger>
                                <AccordionContent>{state.data.pestControlRecommendation}</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger><Leaf className="h-4 w-4 mr-2 text-green-600" />Natural Remedies</AccordionTrigger>
                                <AccordionContent>{state.data.naturalRemediesRecommendation}</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )}
                </CardContent>
                <CardFooter>
                    <SubmitButton>Get Guidance</SubmitButton>
                </CardFooter>
            </Card>
        </form>
    );
}

export function AiInsights() {
  const [predictionResult, setPredictionResult] = useState<PredictPestOutbreaksOutput | null>(null);

  return (
    <Tabs defaultValue="prediction" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="prediction">
          <Sparkles className="mr-2 h-4 w-4" />
          Risk Prediction
        </TabsTrigger>
        <TabsTrigger value="guidance">
          <Bot className="mr-2 h-4 w-4" />
          Crop Guidance
        </TabsTrigger>
      </TabsList>
      <TabsContent value="prediction">
        <PestPrediction onPredictionComplete={setPredictionResult} />
      </TabsContent>
      <TabsContent value="guidance">
        <CropGuidance predictionResult={predictionResult} />
      </TabsContent>
    </Tabs>
  );
}
