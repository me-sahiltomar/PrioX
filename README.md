# PrioX — "Know what matters. Act on it."

**AI-Powered Decision Support for Early-Stage Founders**

> *"PrioX does not give founders more information. It helps them understand what matters, why it matters, and what to consider doing next."*

---

## Overview

Early-stage startup founders managing small teams (5–30 people) are overwhelmed with scattered updates across Slack, customer emails, meetings, and bug reports. 

**PrioX** acts as an executive decision-support system that processes raw, fragmented business updates, extracts critical signals, ranks them according to strategic business dimensions, and organizes them into an actionable **Decision Brief**.

---

## Core Product Loop & Architecture

```
Business Updates (Smart Information Inbox)
                  │
                  ▼
         AI Role Architecture
┌────────────────────────────────────────┐
│  Understand ➔ Detect ➔ Prioritize ➔ Recommend  │
└────────────────────────────────────────┘
                  │
                  ▼
         AI Priority Engine
   • Urgency (Immediate customer/revenue risk)
   • Business Impact (Activation, ARR, retention)
   • Deadlines (Sprint goals, contract dates)
   • Dependencies (Cross-functional bottlenecks)
   • Founder Priorities (Strategic quarterly goals)
                  │
                  ▼
            Decision Brief
   • What Happened
   • Why It Matters
   • Possible Next Action
                  │
                  ▼
         Follow-up Tracker
   (Accountability, ownership, due dates, execution)
```

> **Guiding Principle**: *"AI supports your judgment — you make the final decision."*

---

## The 5 Screens (Figma Wireframe Aligned)

1. **Overview (Executive Briefing)**: 
   - Headline: *"Know what matters. Act on it."*
   - Color-coded priority cards (High, Medium, Monitor, Low) with structured evidence chips and distinct *"Why it matters"* indicators.
   - Executive AI Summary answering *"What changed?"* and highlighting *"Suggested focus"*.
   - Baseline-aligned triage status and quick-action bar.

2. **Smart Information Inbox**: 
   - Ingests raw meeting notes, customer feedback, and metrics.
   - Includes 3 preset scenarios (SaaS Onboarding, Enterprise B2B, Operational Incidents) and quick-insert sample snippets.
   - Interactive sidebar explaining the **AI Priority Engine** (5 dimensions) and priority taxonomy (`High Priority ➔ Important ➔ Monitor ➔ No Action`).

3. **AI Analysis**: 
   - Ranked signals breakdown with priority factor pills (Recurrence, Impact, Urgency).
   - Grounded user-facing explanations answering *"Why is this a priority?"*.

4. **Decision Brief**: 
   - High-contrast executive digest organizing critical signals into **WHAT HAPPENED**, **WHY IT MATTERS**, and **POSSIBLE NEXT ACTION**.
   - One-click markdown export and one-click *"Save as Follow-up"*.

5. **Follow-up Tracker**: 
   - Accountability board tracking Open Actions, Due Today, and Upcoming items.
   - Complete CRUD: custom follow-up creation modal, status updates (Open, In Progress, Completed), search filter, and deletion.

---

## Zero-Configuration & Standalone Execution

- **Zero API Keys Required for reviewers**: Runs standalone out of the box with an intelligent built-in reasoning engine.
- **Optional Live Gemini API**: Seamlessly integrates with Google Gemini API when `GEMINI_API_KEY` is present.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google GenAI SDK (`@google/genai`)
- **Icons**: Lucide React

---

## Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Or build for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
