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
        error: 'Invalid input.',
      };
    }
    
    const input: PredictPestOutbreaksInput = {
        ...validatedFields.data,
        sensorData: "Soil Moisture: 45%, Temperature: 22°C, Humidity: 68%, Rainfall: 5mm",
        historicalTrends: "Similar conditions last year led to minor aphid presence.",
    };

    const result = await predictPestOutbreaks(input);
    return { ...prevState, success: true, data: result };
  } catch (error) {
    console.error(error);
    return { ...prevState, success: false, error: 'Failed to predict pest outbreaks.' };
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
          error: 'Invalid input.',
        };
    }

    // Note: In a real app, this data would come from live sensors.
    const input: GenerateCropGuidanceInput = {
      cropType: validatedFields.data.cropType,
      soilMoisture: 45,
      temperature: 22,
      humidity: 68,
      rainfall: 5,
      pestRisk: validatedFields.data.pestRisk || 'low',
      diseaseRisk: validatedFields.data.diseaseRisk || 'low',
    };
    const result = await generateCropGuidance(input);
    return { ...prevState, success: true, data: result };
  } catch (error) {
    console.error(error);
    return { ...prevState, success: false, error: 'Failed to generate crop guidance.' };
  }
}
