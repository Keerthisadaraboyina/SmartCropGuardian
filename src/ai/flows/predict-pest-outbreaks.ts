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
  sensorData: z.string().describe('Real-time sensor data including soil moisture, temperature, humidity, and rainfall readings.'),
  historicalTrends: z.string().describe('Historical data trends related to pest outbreaks and crop diseases in the area.'),
  cropType: z.string().describe('The type of crop being grown.'),
  location: z.string().describe('The geographical location of the farm.'),
});
export type PredictPestOutbreaksInput = z.infer<typeof PredictPestOutbreaksInputSchema>;

const PredictPestOutbreaksOutputSchema = z.object({
  pestRiskLevel: z.string().describe('The predicted risk level of pest outbreaks (low, medium, high).'),
  diseaseRiskLevel: z.string().describe('The predicted risk level of crop diseases (low, medium, high).'),
  recommendedActions: z.string().describe('Recommended preventive measures to minimize potential damage from pests and diseases.'),
  confidenceScore: z.number().describe('A score between 0 and 1 representing the confidence level of the prediction.'),
});
export type PredictPestOutbreaksOutput = z.infer<typeof PredictPestOutbreaksOutputSchema>;

export async function predictPestOutbreaks(input: PredictPestOutbreaksInput): Promise<PredictPestOutbreaksOutput> {
  return predictPestOutbreaksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictPestOutbreaksPrompt',
  input: {schema: PredictPestOutbreaksInputSchema},
  output: {schema: PredictPestOutbreaksOutputSchema},
  prompt: `You are an expert agricultural advisor specializing in predicting pest outbreaks and crop diseases.

  Analyze the provided sensor data, historical trends, crop type, and location to predict the risk of pest outbreaks and crop diseases.
  Provide recommended actions to prevent potential damage.

  Sensor Data: {{{sensorData}}}
  Historical Trends: {{{historicalTrends}}}
  Crop Type: {{{cropType}}}
  Location: {{{location}}}

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
