# 📚 BookMeetsAI

> A conversational voice web application that brings books to life using voice AI, retrieval-augmented context, and interactive discussion.

🔗 **Live Application:** [bookmeetsai.vercel.app](https://bookmeetsai.vercel.app)

🌟 Overview

BookMeetsAI allows readers to interact with literature through voice conversations. By simulating character perspectives and thematic analysis (e.g., Agatha Christie classics, Sherlock Holmes), users can discuss plot lines, test their comprehension, and experience books dynamically through real-time audio interaction.

🛠️ Tech Stack & Architecture

Frontend & Framework: Next.js (App Router), React, TypeScript

Styling: Tailwind CSS, Lucide Icons

Voice & Real-Time Audio: Vapi Web SDK, Daily.co WebRTC signaling

Backend & Database: Node.js API routes, MongoDB (persistent chat and session history)

Deployment: Vercel

✨ Key Features

🎙️ Real-Time Voice Interaction: Low-latency WebRTC bidirectional voice conversations powered by Vapi.

💬 Live Synchronized Transcripts: Dynamic rendering of caller and AI speech with real-time UI state feedback.

📖 Literary Knowledge Context: Tailored prompts and context personas grounded in specific book plots and themes.

⚡ Responsive Modern UI: Interactive status badges, conversation timers, and smooth responsive design across desktop and mobile.

🚀 Getting Started

Clone the repository:
```bash
git clone https://github.com/bharathicodes10/Bookmind.git
cd Bookmind
```

Install dependencies:
```bash
npm install
```

Set up environment variables in a `.env.local` file:
```env
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
MONGODB_URI=your_mongodb_connection_string
```

Run the development server:
```bash
npm run dev
```

Open http://localhost:3000 to view the application.
