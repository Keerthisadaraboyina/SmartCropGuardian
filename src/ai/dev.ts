import { config } from 'dotenv';
config();

import '@/ai/flows/generate-crop-guidance.ts';
import '@/ai/flows/predict-pest-outbreaks.ts';
import '@/ai/flows/translate-text.ts';
