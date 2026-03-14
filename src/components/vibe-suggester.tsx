
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { generateVibeDescription } from "@/ai/flows/generate-vibe-description";
import { toast } from "@/hooks/use-toast";

interface VibeSuggesterProps {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  onSelect: (vibe: string) => void;
}

export function VibeSuggester({ eventTitle, eventDate, eventTime, eventVenue, onSelect }: VibeSuggesterProps) {
  const [loading, setLoading] = useState(false);

  const suggest = async () => {
    setLoading(true);
    try {
      const result = await generateVibeDescription({
        eventName: eventTitle,
        eventDate,
        eventTime,
        eventVenue,
        keywords: ["bold", "hype", "electric"]
      });
      if (result.vibeDescription) {
        onSelect(result.vibeDescription);
      }
    } catch (error) {
      toast({
        title: "AI Failed",
        description: "Could not generate vibe description right now.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      type="button"
      variant="outline" 
      size="sm" 
      onClick={suggest} 
      disabled={loading}
      className="border-primary/50 text-primary hover:bg-primary/10"
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Magic Vibe Suggestion
    </Button>
  );
}
