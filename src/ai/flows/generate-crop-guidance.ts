'use server';

/**
 * @fileOverview Generates crop guidance based on sensor data and user input.
 *
 * - generateCropGuidance - A function that generates crop guidance.
 * - GenerateCropGuidanceInput - The input type for the generateCropGuidance function.
 * - GenerateCropGuidanceOutput - The return type for the generateCropGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCropGuidanceInputSchema = z.object({
  cropType: z.string().describe('The type of crop.'),
  soilMoisture: z.number().describe('The current soil moisture level (%).'),
  temperature: z.number().describe('The current temperature (°C).'),
  humidity: z.number().describe('The current humidity (%).'),
  rainfall: z.number().describe('The rainfall in the last 24 hours (mm).'),
  pestRisk: z.string().describe('The predicted pest risk level (low, medium, high).'),
  diseaseRisk: z.string().describe('The predicted disease risk level (low, medium, high).'),
});

export type GenerateCropGuidanceInput = z.infer<typeof GenerateCropGuidanceInputSchema>;

const GenerateCropGuidanceOutputSchema = z.object({
  irrigationRecommendation: z.string().describe('Recommendation for irrigation.'),
  pestControlRecommendation: z.string().describe('Recommendation for pest control.'),
  naturalRemediesRecommendation: z.string().describe('Recommendation for natural remedies.'),
});

export type GenerateCropGuidanceOutput = z.infer<typeof GenerateCropGuidanceOutputSchema>;

export async function generateCropGuidance(input: GenerateCropGuidanceInput): Promise<GenerateCropGuidanceOutput> {
  return generateCropGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCropGuidancePrompt',
  input: {schema: GenerateCropGuidanceInputSchema},
  output: {schema: GenerateCropGuidanceOutputSchema},
  prompt: `You are an AI assistant providing crop protection guidance to farmers.

  Based on the following data, provide actionable recommendations for irrigation, pest control, and natural remedies.

  Crop Type: {{{cropType}}}
  Soil Moisture: {{{soilMoisture}}}%
  Temperature: {{{temperature}}}°C
  Humidity: {{{humidity}}}%
  Rainfall: {{{rainfall}}}mm
  Pest Risk: {{{pestRisk}}}
  Disease Risk: {{{diseaseRisk}}}

  Format your response as follows:

  Irrigation Recommendation: ...
  Pest Control Recommendation: ...
  Natural Remedies Recommendation: ...`,
});

const generateCropGuidanceFlow = ai.defineFlow(
  {
    name: 'generateCropGuidanceFlow',
    inputSchema: GenerateCropGuidanceInputSchema,
    outputSchema: GenerateCropGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
