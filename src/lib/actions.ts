'use server';

import {
  generateCropGuidance,
  type GenerateCropGuidanceInput,
} from '@/ai/flows/generate-crop-guidance';
import {
  predictPestOutbreaks,
  type PredictPestOutbreaksInput,
} from '@/ai/flows/predict-pest-outbreaks';
import { z } from 'zod';
import { currentSensorData } from './data';

const predictSchema = z.object({
    cropType: z.string(),
    location: z.string(),
});

export async function predictPestOutbreaksAction(
  prevState: any,
  formData: FormData
) {
  try {
    const validatedFields = predictSchema.safeParse({
      cropType: formData.get('cropType'),
      location: formData.get('location'),
    });

    if (!validatedFields.success) {
      return {
        ...prevState,
        success: false,
        error: 'Invalid input. Please select a crop and location.',
      };
    }
    
    const input: PredictPestOutbreaksInput = {
        ...validatedFields.data,
        temperature: currentSensorData.temperature,
        humidity: currentSensorData.humidity,
        rainfall: currentSensorData.rainfall,
        soilMoisture: currentSensorData.soilMoisture,
        historicalTrends: "Similar conditions last year led to minor aphid presence.",
    };

    const result = await predictPestOutbreaks(input);
    return { ...prevState, success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to predict pest outbreaks.';
    return { ...prevState, success: false, error: errorMessage };
  }
}

const guidanceSchema = z.object({
    cropType: z.string(),
    pestRisk: z.string().optional(),
    diseaseRisk: z.string().optional(),
});

export async function generateCropGuidanceAction(prevState: any, formData: FormData) {
  try {
    const validatedFields = guidanceSchema.safeParse({
        cropType: formData.get('cropType'),
        pestRisk: formData.get('pestRisk'),
        diseaseRisk: formData.get('diseaseRisk'),
    });

    if (!validatedFields.success) {
        return {
          ...prevState,
          success: false,
          error: 'Invalid input. Please select a crop.',
        };
    }

    const input: GenerateCropGuidanceInput = {
      cropType: validatedFields.data.cropType,
      soilMoisture: currentSensorData.soilMoisture,
      temperature: currentSensorData.temperature,
      humidity: currentSensorData.humidity,
      rainfall: currentSensorData.rainfall,
      pestRisk: validatedFields.data.pestRisk || 'low',
      diseaseRisk: validatedFields.data.diseaseRisk || 'low',
    };
    const result = await generateCropGuidance(input);
    return { ...prevState, success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate crop guidance.';
    return { ...prevState, success: false, error: errorMessage };
  }
}
