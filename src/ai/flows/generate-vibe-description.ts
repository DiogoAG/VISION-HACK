'use server';
/**
 * @fileOverview A Genkit flow that generates creative 'vibe descriptions' for an event.
 *
 * - generateVibeDescription - A function that handles the vibe description generation process.
 * - GenerateVibeDescriptionInput - The input type for the generateVibeDescription function.
 * - GenerateVibeDescriptionOutput - The return type for the generateVibeDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateVibeDescriptionInputSchema = z.object({
  eventName: z.string().describe('The name of the event.'),
  eventDate: z.string().describe('The date of the event (e.g., "YYYY-MM-DD").'),
  eventTime: z.string().describe('The time of the event (e.g., "HH:MM AM/PM").'),
  eventVenue: z.string().describe('The venue where the event will take place.'),
  eventTheme: z.string().optional().describe('Optional: The theme or specific type of the event (e.g., "tropical disco", "noir mystery").'),
  keywords: z.array(z.string()).optional().describe('Optional: A list of keywords to guide the vibe description (e.g., "energetic", "chill", "exclusive").'),
});
export type GenerateVibeDescriptionInput = z.infer<typeof GenerateVibeDescriptionInputSchema>;

const GenerateVibeDescriptionOutputSchema = z.object({
  vibeDescription: z.string().describe('A short, engaging, and creative description of the event\'s atmosphere or vibe.'),
});
export type GenerateVibeDescriptionOutput = z.infer<typeof GenerateVibeDescriptionOutputSchema>;

export async function generateVibeDescription(input: GenerateVibeDescriptionInput): Promise<GenerateVibeDescriptionOutput> {
  return generateVibeDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVibeDescriptionPrompt',
  input: { schema: GenerateVibeDescriptionInputSchema },
  output: { schema: GenerateVibeDescriptionOutputSchema },
  prompt: `You are a creative event planner assistant specializing in crafting captivating event vibe descriptions.

Generate a short, engaging, and creative description of the event's atmosphere or "vibe" based on the following details. Your description should be bold and hype, reflecting the electric and energetic mood of a party.

Event Name: {{{eventName}}}
Event Date: {{{eventDate}}}
Event Time: {{{eventTime}}}
Event Venue: {{{eventVenue}}}
{{#if eventTheme}}Event Theme: {{{eventTheme}}}{{/if}}
{{#if keywords}}Keywords: {{#each keywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}

Aim for 1-2 sentences that perfectly capture the essence. Do not include a title or any introductory/concluding remarks.
`,
});

const generateVibeDescriptionFlow = ai.defineFlow(
  {
    name: 'generateVibeDescriptionFlow',
    inputSchema: GenerateVibeDescriptionInputSchema,
    outputSchema: GenerateVibeDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
