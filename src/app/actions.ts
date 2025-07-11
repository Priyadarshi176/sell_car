"use server";

import { suggestPrice } from "@/ai/flows/suggest-pricing";
import type { SuggestPriceInput, SuggestPriceOutput } from "@/ai/flows/suggest-pricing";

export async function getAiPricingSuggestion(
  input: SuggestPriceInput
): Promise<SuggestPriceOutput> {
  try {
    const suggestion = await suggestPrice(input);
    return suggestion;
  } catch (error) {
    console.error("Error getting AI pricing suggestion:", error);
    // In a real app, you might want to return a more user-friendly error
    throw new Error("Failed to get pricing suggestion from AI.");
  }
}
