
export interface Guest {
  id: string;
  name: string;
  timestamp: number;
}

export interface EventData {
  title: string;
  date: string;
  time: string;
  venue: string;
  vibe: string;
  isRsvpOpen: boolean;
  guests: Guest[];
}
