'use server';
/**
 * @fileOverview An AI agent that predicts pest outbreaks and crop diseases based on sensor data and historical trends.
 *
 * - predictPestOutbreaks - A function that handles the pest outbreak prediction process.
 * - PredictPestOutbreaksInput - The input type for the predictPestOutbreaks function.
 * - PredictPestOutbreaksOutput - The return type for the predictPestOutbreaks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictPestOutbreaksInputSchema = z.object({
  cropType: z.string().describe('The type of crop being grown.'),
  location: z.string().describe('The geographical location of the farm.'),
  temperature: z.number().describe('The current temperature in Celsius.'),
  humidity: z.number().describe('The current humidity in percentage.'),
  rainfall: z.number().describe('The recent rainfall in mm.'),
  soilMoisture: z.number().describe('The current soil moisture in percentage.'),
  historicalTrends: z.string().describe('Historical data trends related to pest outbreaks and crop diseases in the area.'),
});
export type PredictPestOutbreaksInput = z.infer<typeof PredictPestOutbreaksInputSchema>;

const PredictPestOutbreaksOutputSchema = z.object({
  pestRiskLevel: z.enum(['low', 'medium', 'high']).describe('The predicted risk level of pest outbreaks (low, medium, high).'),
  diseaseRiskLevel: z.enum(['low', 'medium', 'high']).describe('The predicted risk level of crop diseases (low, medium, high).'),
  recommendedActions: z.string().describe('Recommended preventive measures to minimize potential damage from pests and diseases.'),
  confidenceScore: z.number().min(0).max(1).describe('A score between 0 and 1 representing the confidence level of the prediction.'),
});
export type PredictPestOutbreaksOutput = z.infer<typeof PredictPestOutbreaksOutputSchema>;

export async function predictPestOutbreaks(input: PredictPestOutbreaksInput): Promise<PredictPestOutbreaksOutput> {
  return predictPestOutbreaksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictPestOutbreaksPrompt',
  input: {schema: PredictPestOutbreaksInputSchema},
  output: {schema: PredictPestOutbreaksOutputSchema},
  prompt: `You are an expert agricultural advisor specializing in predicting pest outbreaks and crop diseases in India.

  Analyze the provided sensor data, historical trends, crop type, and location to predict the risk of pest outbreaks and crop diseases.
  Provide recommended actions to prevent potential damage.

  Crop Type: {{{cropType}}}
  Location: {{{location}}}
  Temperature: {{{temperature}}}°C
  Humidity: {{{humidity}}}%
  Rainfall: {{{rainfall}}}mm
  Soil Moisture: {{{soilMoisture}}}%
  Historical Trends: {{{historicalTrends}}}

  Based on this information, provide a pestRiskLevel (low, medium, high), diseaseRiskLevel (low, medium, high), recommendedActions, and a confidenceScore between 0 and 1.
  `,
});

const predictPestOutbreaksFlow = ai.defineFlow(
  {
    name: 'predictPestOutbreaksFlow',
    inputSchema: PredictPestOutbreaksInputSchema,
    outputSchema: PredictPestOutbreaksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
