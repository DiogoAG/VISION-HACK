# Vision Hack | Party RSVPs

Vision Hack is a bold, high-energy event management prototype designed for pulse-pounding parties and exclusive gatherings. It features a seamless RSVP experience for attendees and a powerful "Command Centre" for organizers.

## 🚀 Features

- **Dual-Mode Interface**: Switch between the **Attendee** view (clean, focused RSVP) and the **Organiser** dashboard (full event control).
- **AI-Powered Vibe Suggestions**: Uses Genkit and Gemini to generate electric, hype-filled event descriptions based on your event details.
- **Real-time Prototyping**: Data persists in local storage, allowing for immediate feedback during development and testing.
- **Cyberpunk Aesthetic**: A modern dark-mode UI featuring mesh gradients, glassmorphism, and bold typography (Space Grotesk & Inter).

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **AI Toolkit**: [Genkit](https://firebase.google.com/docs/genkit) with Google Generative AI (Gemini 2.5 Flash)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📖 How to Use

1. **Attendee View**: Enter your name and hit the "RSVP" button to join the guest list.
2. **Organiser Dashboard**: Click the "Organiser" tab to edit event details. Use the "Magic Vibe Suggestion" button to let the AI craft the perfect description for your party.
3. **RSVP Control**: Toggle the "Status" switch in the Command Centre to open or close the guest list.

## 🧞 AI Integration

The app uses a Genkit flow (`src/ai/flows/generate-vibe-description.ts`) to transform standard event data into captivating, high-hype descriptions. This flow is accessible via the "Magic Vibe Suggestion" button on the host dashboard.
