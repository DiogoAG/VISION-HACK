
"use client";

import { useState, useEffect } from 'react';
import { EventData, Guest } from '@/lib/types';

const STORAGE_KEY = 'showup_event_v1';

const DEFAULT_EVENT: EventData = {
  title: "Vision Hack",
  date: "2024-12-31",
  time: "22:00",
  venue: "The Boiler Room, Downtown",
  vibe: "A pulse-pounding descent into bass-heavy rhythms and blinding neon lights. Join the elite as we dance until the sun screams.",
  isRsvpOpen: true,
  guests: []
};

export function useEventData() {
  const [data, setData] = useState<EventData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        setData(DEFAULT_EVENT);
      }
    } else {
      setData(DEFAULT_EVENT);
    }
  }, []);

  const saveData = (newData: EventData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const updateEvent = (updates: Partial<EventData>) => {
    if (!data) return;
    saveData({ ...data, ...updates });
  };

  const addGuest = (name: string) => {
    if (!data) return;
    const newGuest: Guest = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      timestamp: Date.now()
    };
    saveData({
      ...data,
      guests: [newGuest, ...data.guests]
    });
  };

  const toggleRSVP = () => {
    if (!data) return;
    saveData({ ...data, isRsvpOpen: !data.isRsvpOpen });
  };

  return { data, updateEvent, addGuest, toggleRSVP };
}
