// This is an AI-powered flow that analyzes lotto statistics to provide insights for making informed number choices.
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLottoStatisticsInputSchema = z.object({
  pastWinningNumbers: z
    .string()
    .describe(
      'A comma-separated string of past winning lotto numbers. Each number should be between 1 and 45, with no duplicates.  For example: 1,2,3,4,5,6'
    ),
});

export type AnalyzeLottoStatisticsInput = z.infer<
  typeof AnalyzeLottoStatisticsInputSchema
>;

const AnalyzeLottoStatisticsOutputSchema = z.object({
  summary: z.string().describe('A summary of the lotto statistics.'),
  recommendedNumbers: z
    .string()
    .describe(
      'A comma-separated string of recommended lotto numbers based on the statistics analysis. Each number should be between 1 and 45, with no duplicates. For example: 7,12,18,23,31,42'
    ),
});

export type AnalyzeLottoStatisticsOutput = z.infer<
  typeof AnalyzeLottoStatisticsOutputSchema
>;

export async function analyzeLottoStatistics(
  input: AnalyzeLottoStatisticsInput
): Promise<AnalyzeLottoStatisticsOutput> {
  return analyzeLottoStatisticsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeLottoStatisticsPrompt',
  input: {schema: AnalyzeLottoStatisticsInputSchema},
  output: {schema: AnalyzeLottoStatisticsOutputSchema},
  prompt: `You are an AI-powered lotto statistician. Analyze the past winning lotto numbers provided and provide a summary of the statistics and recommend numbers to pick based on the analysis.

Past Winning Numbers: {{{pastWinningNumbers}}}

Summary:
{{output.summary}}

Recommended Numbers:
{{output.recommendedNumbers}}`,
});

const analyzeLottoStatisticsFlow = ai.defineFlow(
  {
    name: 'analyzeLottoStatisticsFlow',
    inputSchema: AnalyzeLottoStatisticsInputSchema,
    outputSchema: AnalyzeLottoStatisticsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
