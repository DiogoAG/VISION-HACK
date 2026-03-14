
"use client";

import { useState } from "react";
import { useEventData } from "@/hooks/use-event-data";
import { GuestView } from "@/components/guest-view";
import { HostDashboard } from "@/components/host-dashboard";
import { Toaster } from "@/components/ui/toaster";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShieldCheck, Loader2 } from "lucide-react";

export default function ShowUpPage() {
  const { data, updateEvent, addGuest, toggleRSVP } = useEventData();
  const [view, setView] = useState<"guest" | "host">("guest");

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-24">
      <div className="fixed top-4 right-4 z-[100]">
        <Tabs value={view} onValueChange={(v) => setView(v as "guest" | "host")}>
          <TabsList className="bg-black/40 backdrop-blur-xl border border-white/10 p-1 h-12 rounded-2xl shadow-2xl">
            <TabsTrigger 
              value="guest" 
              className="rounded-xl px-4 flex gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Attendee</span>
            </TabsTrigger>
            <TabsTrigger 
              value="host" 
              className="rounded-xl px-4 flex gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Organiser</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="animate-in fade-in duration-700">
        {view === "guest" ? (
          <GuestView data={data} onRsvp={addGuest} />
        ) : (
          <HostDashboard data={data} onUpdate={updateEvent} onToggle={toggleRSVP} />
        )}
      </div>

      <Toaster />
    </main>
  );
}
