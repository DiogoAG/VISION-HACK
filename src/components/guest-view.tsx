
"use client";

import { useState } from "react";
import Image from "next/image";
import { EventData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, PartyPopper } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface GuestViewProps {
  data: EventData;
  onRsvp: (name: string) => void;
}

export function GuestView({ data, onRsvp }: GuestViewProps) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const coverImage = PlaceHolderImages.find(img => img.id === 'event-cover');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onRsvp(name.trim());
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-md mx-auto pb-20 px-4 pt-4 space-y-6">
      <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
        {coverImage && (
          <Image
            src={coverImage.imageUrl}
            alt={coverImage.description}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            data-ai-hint={coverImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="bg-secondary mb-2 hover:bg-secondary animate-pulse-glow">
            HAPPENING SOON
          </Badge>
          <h1 className="text-3xl font-headline font-bold text-white drop-shadow-lg leading-tight">
            {data.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg text-primary">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">DATE</p>
            <p className="text-sm font-semibold">{data.date}</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg text-primary">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">TIME</p>
            <p className="text-sm font-semibold">{data.time}</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-4 rounded-xl flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">VENUE</p>
          <p className="text-sm font-semibold">{data.venue}</p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-3">
        <h3 className="font-headline text-lg font-bold flex items-center gap-2">
          <PartyPopper className="w-5 h-5 text-secondary" />
          THE VIBE
        </h3>
        <p className="text-muted-foreground leading-relaxed italic">
          "{data.vibe}"
        </p>
      </div>

      <div className="flex justify-between items-center glass-card p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <span className="font-semibold">{data.guests.length}</span>
          <span className="text-sm text-muted-foreground">Joined the list</span>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
              {String.fromCharCode(64 + i)}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
            +
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto">
        {!data.isRsvpOpen ? (
          <div className="glass-card p-4 rounded-2xl border-destructive/30 bg-destructive/10 text-center animate-in fade-in slide-in-from-bottom-4">
            <p className="font-bold text-destructive">SORRY, THIS EVENT IS FULL 🔒</p>
          </div>
        ) : submitted ? (
          <div className="glass-card p-6 rounded-2xl border-secondary/30 bg-secondary/10 text-center animate-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-headline font-bold text-secondary mb-1">YOU'RE ON THE LIST! 🎉</h2>
            <p className="text-sm text-muted-foreground">See you at the dancefloor.</p>
          </div>
        ) : (
          <Card className="glass-card border-primary/30 p-2 shadow-2xl">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border-none focus-visible:ring-0 text-lg h-12"
                required
              />
              <Button type="submit" size="lg" className="bg-destructive hover:bg-destructive/90 text-white font-bold h-12 px-8">
                RSVP
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
