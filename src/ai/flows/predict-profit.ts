'use server';
/**
 * @fileOverview An AI agent that predicts crop profitability.
 *
 * - predictProfit - A function that predicts profit based on costs and market price.
 * - PredictProfitInput - The input type for the predictProfit function.
 * - PredictProfitOutput - The return type for the predictProfit function.
 */

import {ai} from '@/ai/genkit';
import {
  PredictProfitInputSchema,
  type PredictProfitInput,
  PredictProfitOutputSchema,
  type PredictProfitOutput,
} from '@/ai/schemas/predict-profit-schema';
export type {PredictProfitInput, PredictProfitOutput};

export async function predictProfit(
  input: PredictProfitInput
): Promise<PredictProfitOutput> {
  return predictProfitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictProfitPrompt',
  input: {schema: PredictProfitInputSchema},
  output: {schema: PredictProfitOutputSchema},
  prompt: `You are a financial advisor for farmers. Based on the provided crop type, total cost of production, and current market price, predict the potential profit and profit margin. Provide a short, actionable recommendation to improve profitability. Assume a yield of 50 quintals per hectare for calculation.

  Crop Type: {{{cropType}}}
  Total Cost of Production (per hectare): {{{totalCost}}}
  Market Price (per quintal): {{{marketPrice}}}

  Calculate the total revenue, then the profit, and finally the profit margin. Provide one concise recommendation.
  `,
});

const predictProfitFlow = ai.defineFlow(
  {
    name: 'predictProfitFlow',
    inputSchema: PredictProfitInputSchema,
    outputSchema: PredictProfitOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
