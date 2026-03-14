
"use client";

import { EventData, Guest } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VibeSuggester } from "@/components/vibe-suggester";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Settings, Users, Activity, ToggleLeft } from "lucide-react";

interface HostDashboardProps {
  data: EventData;
  onUpdate: (updates: Partial<EventData>) => void;
  onToggle: () => void;
}

export function HostDashboard({ data, onUpdate, onToggle }: HostDashboardProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-headline font-bold text-primary mb-2">Command Centre</h1>
          <p className="text-muted-foreground italic">Managing "{data.title}"</p>
        </div>
        <div className="flex items-center gap-6 glass-card p-4 rounded-2xl">
          <div className="text-center">
            <p className="text-2xl font-headline font-bold text-white leading-none">{data.guests.length}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Attendees</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold text-white uppercase">{data.isRsvpOpen ? 'Open' : 'Closed'}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Status</p>
            </div>
            <Switch checked={data.isRsvpOpen} onCheckedChange={onToggle} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <CardTitle className="font-headline text-xl">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title</Label>
                <Input
                  id="title"
                  value={data.title}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  className="bg-background/50 border-white/10 h-11 text-lg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={data.date}
                    onChange={(e) => onUpdate({ date: e.target.value })}
                    className="bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={data.time}
                    onChange={(e) => onUpdate({ time: e.target.value })}
                    className="bg-background/50 border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Venue</Label>
                <Input
                  id="venue"
                  value={data.venue}
                  onChange={(e) => onUpdate({ venue: e.target.value })}
                  className="bg-background/50 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="vibe" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Vibe Description</Label>
                  <VibeSuggester
                    eventTitle={data.title}
                    eventDate={data.date}
                    eventTime={data.time}
                    eventVenue={data.venue}
                    onSelect={(vibe) => onUpdate({ vibe })}
                  />
                </div>
                <Textarea
                  id="vibe"
                  value={data.vibe}
                  onChange={(e) => onUpdate({ vibe: e.target.value })}
                  className="bg-background/50 border-white/10 min-h-[100px] leading-relaxed"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-card border-secondary/20">
            <CardHeader className="flex flex-row items-center gap-2">
              <Users className="w-5 h-5 text-secondary" />
              <CardTitle className="font-headline text-xl">Guest List</CardTitle>
              <Badge variant="secondary" className="ml-auto bg-secondary text-white">{data.guests.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
                {data.guests.length === 0 ? (
                  <div className="text-center py-10 opacity-50 border-2 border-dashed border-white/10 rounded-xl">
                    <Activity className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Waiting for guests...</p>
                  </div>
                ) : (
                  data.guests.map((guest) => (
                    <div key={guest.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-colors animate-in slide-in-from-right-4">
                      <div>
                        <p className="font-bold group-hover:text-secondary transition-colors">{guest.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">
                          Joined {formatDistanceToNow(guest.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-[10px] opacity-50">RSVP</Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
