import {z} from 'genkit';

export const PredictProfitInputSchema = z.object({
  cropType: z.string().describe('The type of crop.'),
  totalCost: z.number().describe('The total cost of production for the crop.'),
  marketPrice: z.number().describe('The current market price for the crop per quintal.'),
});
export type PredictProfitInput = z.infer<typeof PredictProfitInputSchema>;

export const PredictProfitOutputSchema = z.object({
  predictedProfit: z.number().describe('The predicted profit in the currency.'),
  predictedProfitMargin: z
    .number()
    .describe('The predicted profit margin as a percentage.'),
  recommendation: z
    .string()
    .describe('A recommendation on how to improve profitability.'),
});
export type PredictProfitOutput = z.infer<typeof PredictProfitOutputSchema>;
