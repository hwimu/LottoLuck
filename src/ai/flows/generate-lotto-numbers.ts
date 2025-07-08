// This is a server-side file.
'use server';

/**
 * @fileOverview Generates lotto numbers using AI based on historical data.
 *
 * - generateLottoNumbers - A function that generates lotto number combinations.
 * - GenerateLottoNumbersInput - The input type for the generateLottoNumbers function.
 * - GenerateLottoNumbersOutput - The return type for the generateLottoNumbers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLottoNumbersInputSchema = z.object({
  numCombinations: z
    .number()
    .default(1)
    .describe('The number of lotto number combinations to generate.'),
  preferredNumbers: z
    .array(z.number().min(1).max(45))
    .optional()
    .describe('A list of preferred numbers to include in the combinations.'),
  excludedNumbers: z
    .array(z.number().min(1).max(45))
    .optional()
    .describe('A list of numbers to exclude from the combinations.'),
});
export type GenerateLottoNumbersInput = z.infer<typeof GenerateLottoNumbersInputSchema>;

const GenerateLottoNumbersOutputSchema = z.object({
  combinations: z.array(z.array(z.number().min(1).max(45))).describe('An array of lotto number combinations.'),
});
export type GenerateLottoNumbersOutput = z.infer<typeof GenerateLottoNumbersOutputSchema>;

export async function generateLottoNumbers(input: GenerateLottoNumbersInput): Promise<GenerateLottoNumbersOutput> {
  return generateLottoNumbersFlow(input);
}

const generateLottoNumbersPrompt = ai.definePrompt({
  name: 'generateLottoNumbersPrompt',
  input: {
    schema: GenerateLottoNumbersInputSchema,
  },
  output: {
    schema: GenerateLottoNumbersOutputSchema,
  },
  prompt: `You are an AI assistant that generates lotto number combinations based on historical data and user preferences.

  Generate {{numCombinations}} lotto number combinations. Each combination should contain 6 unique numbers between 1 and 45.

  {% if preferredNumbers %}
  Include the following preferred numbers in the combinations where possible: {{preferredNumbers}}.
  {% endif %}

  {% if excludedNumbers %}
  Exclude the following numbers from the combinations: {{excludedNumbers}}.
  {% endif %}

  Return the combinations as a JSON array of arrays.
  `,
});

const generateLottoNumbersFlow = ai.defineFlow(
  {
    name: 'generateLottoNumbersFlow',
    inputSchema: GenerateLottoNumbersInputSchema,
    outputSchema: GenerateLottoNumbersOutputSchema,
  },
  async input => {
    const {output} = await generateLottoNumbersPrompt(input);
    return output!;
  }
);
