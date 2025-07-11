"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAiPricingSuggestion } from "@/app/actions";
import { Loader2, Lightbulb, Wand2 } from "lucide-react";
import type { SuggestPriceOutput } from "@/ai/flows/suggest-pricing";

interface PricingAssistantProps {
  form: UseFormReturn<any>;
}

export function PricingAssistant({ form }: PricingAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestPriceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestPrice = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const data = form.getValues();
    const result = await form.trigger(["make", "model", "year", "mileage", "condition", "zipCode"]);

    if (!result) {
      setIsLoading(false);
      setError("Please fill in all vehicle details before suggesting a price.");
      return;
    }

    try {
      const aiResult = await getAiPricingSuggestion({
        make: data.make,
        model: data.model,
        year: data.year,
        mileage: data.mileage,
        condition: data.condition,
        zipCode: data.zipCode,
      });
      setSuggestion(aiResult);
    } catch (e) {
      setError("Could not generate a price suggestion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const applySuggestedPrice = () => {
    if (suggestion) {
      form.setValue("price", suggestion.suggestedPrice, { shouldValidate: true });
    }
  };

  return (
    <Card className="bg-accent/20 border-accent/50">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Wand2 className="w-8 h-8 text-accent"/>
            <div>
                <CardTitle className="font-headline text-accent">AI Pricing Assistant</CardTitle>
                <CardDescription>Not sure what to ask? Let our AI suggest a competitive price.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Asking Price</FormLabel>
              <div className="flex flex-col sm:flex-row gap-2">
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input type="number" placeholder="e.g. 25000" className="pl-6" {...field} />
                  </div>
                </FormControl>
                <Button type="button" onClick={handleSuggestPrice} disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Suggestion...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Suggest Price with AI
                    </>
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        
        {suggestion && (
          <Alert className="bg-background">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle className="font-headline text-primary">AI Suggestion: ${suggestion.suggestedPrice.toLocaleString()}</AlertTitle>
            <AlertDescription>
              {suggestion.reasoning}
            </AlertDescription>
            <Button type="button" size="sm" variant="link" className="px-0 h-auto mt-2" onClick={applySuggestedPrice}>Apply this price</Button>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
