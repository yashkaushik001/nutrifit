# NutriFit

A full-stack nutrition and fitness web application featuring a Node.js/Express & MySQL backend and a React/Vite frontend.

## Project Structure

```
Nutrifit/
├── backend/       # Express API server with MySQL & JWT auth
└── frontend/      # React + Vite client application
```

## Quick Start (All-in-One)

You can now start everything (Database check, Backend, and Frontend) together:

### Option A: 1-Click Launch (Windows)
- Double-click **`start-dev.bat`** (or create a Desktop shortcut). It checks MySQL, starts both backend and frontend, and opens the browser.
- To stop all services anytime, double-click **`stop-dev.bat`**.

### Option B: Single Command (Terminal)
From the project root:
```bash
npm run dev
```
*(Runs both backend on `:5000` and frontend on `:5173` concurrently with colored logs).*

---

## Detailed Setup

### Prerequisites
- Node.js (v18+ recommended)
- MySQL Server

### 1. Backend Setup
```bash
cd backend
npm install
# Configure your environment variables in .env (see .env.example)
npm start # or node server.js
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
