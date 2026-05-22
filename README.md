# FTL - Frontend

Room booking management system built with Next.js.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React + Custom SVGs
- **API:** REST on `http://localhost:3001`

## Prerequisites

- Node.js 18+
- npm

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Page |
|-------|------|
| `/` | Dashboard (booking list) |
| `/booking` | Book room form |
| `/profile` | User profile |

## Environment

The frontend connects to the backend at `http://localhost:3001/api`. Make sure the backend is running before using the booking form.
