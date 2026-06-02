<div align="center">

# Remindly

**The task manager that gets out of your way.**

Remindly is a focused productivity app that lets you organize tasks into color-coded collections, track completion progress at a glance, and create tasks from plain English — no form-filling required.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-green?style=flat-square&logo=postgresql)
![Auth](https://img.shields.io/badge/Auth-Clerk-purple?style=flat-square)
![AI](https://img.shields.io/badge/AI-Gemini%202.0%20Flash-orange?style=flat-square&logo=google)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)

</div>

---

## Overview

Most productivity tools are too heavy. They demand structure upfront, bury the interface in menus, and make the act of capturing a thought slower than a sticky note. Remindly takes the opposite stance: capture fast, organize naturally, track effortlessly.

Tasks live inside **collections** — lightweight containers with a name, a color, and a progress bar. You see exactly where you stand without digging through filters or reports. When you need to add something quickly, describe it in plain English and the AI extracts the task content and any deadline from your words automatically.

Remindly is built for individuals and small teams who want a durable place for their to-dos without subscribing to the complexity of project management suites. It works in any browser, adapts to any screen size, and keeps your data private — every collection and every task is scoped to your account.

---

## Features

### Core

- **Collections with color themes** — Group tasks under named collections, each with one of 19 gradient color schemes. Collections show a live completion percentage and a visual progress bar so your workload is readable at a glance.
- **Task lifecycle management** — Create tasks manually or via AI, mark them complete with a checkbox, and assign optional deadlines. Overdue tasks surface in red, tasks due within 7 days in amber, future tasks in green.
- **Real-time search** — A debounced search bar filters both collection names and task content simultaneously, so you can locate anything without leaving the dashboard.
- **Dashboard stats** — Four summary cards (Total, Completed, Pending, Overdue) give you an instant read on your overall workload.
- **Sort and filter** — Collections can be sorted by creation date, name, or task count.

### AI

- **Natural language task creation** — Type a sentence like *"Submit the Q3 report by Friday"* and Gemini 2.0 Flash extracts the task description and deadline into structured fields. No dates to pick, no forms to fill.
- **Smart deadline parsing** — The AI returns ISO 8601 timestamps so deadlines integrate cleanly with the urgency system — overdue, soon, or future — the moment a task is created.
- **Rate-limited and optional** — AI requests are capped at 10 per minute per user via Upstash Redis. The feature degrades gracefully if `GEMINI_API_KEY` is not set.

### Authentication & Security

- **Clerk authentication** — Sign up and sign in with email or OAuth. Sessions are managed by Clerk; no passwords stored in the database.
- **Ownership enforcement** — Every read and write verifies that the requesting user owns the resource. A user can never read, modify, or delete another user's collections or tasks.
- **Mutation rate limiting** — Standard create/delete operations are limited to 30 per minute per user to prevent abuse.
- **Input validation** — All user input is validated with Zod schemas before it reaches the database. Control characters are stripped from AI inputs.

### Performance

- **Server Components by default** — The dashboard is a Next.js Server Component. Data is fetched on the server before the page renders; no loading spinners for the initial view.
- **Lazy-loaded dialogs** — The create-collection sheet and AI task dialog are dynamically imported, keeping the initial bundle small.
- **Lazy database client** — The Neon PostgreSQL client is initialized via a Proxy, preventing connection errors at build time in environments without `DATABASE_URL`.
- **Path-scoped revalidation** — After mutations, only the `/dashboard` path is revalidated, not the entire cache.
- **Debounced search** — The search input debounces at 200 ms to avoid unnecessary renders on every keystroke.

### Developer Experience

- **Layered architecture** — UI → Server Actions → Services → Repositories → Database. Each layer has a single responsibility and is independently testable.
- **Full TypeScript** — Strict mode enabled. Drizzle ORM infers database types from the schema; Zod infers validation types from schemas. No `any`.
- **Vitest unit tests** — Service layer, schema validation, AI parsing, and error handling are all covered. Tests run in under 10 seconds.
- **Playwright E2E** — End-to-end test suite for critical user flows.
- **Drizzle Studio** — `npm run db:studio` opens a GUI for the database.
- **Consistent error codes** — `AppError` with typed codes (`VALIDATION`, `FORBIDDEN`, `RATE_LIMITED`, etc.) flows from server to client uniformly.

### UI & Design

- **Dark mode** — Full dark mode via `next-themes`, toggled from the header. Persisted across sessions.
- **Radix UI primitives** — 26 accessible, unstyled Radix components form the foundation of the UI. No accessibility shortcuts taken.
- **Tailwind CSS theming** — Colors defined as HSL CSS variables; the entire palette switches cleanly between light and dark.
- **Responsive layout** — Single column on mobile, two-column grid on desktop. The header collapses to a hamburger menu on small screens.
- **Sonner toasts** — Non-blocking toast notifications for all user actions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Database | PostgreSQL via Neon (serverless) |
| ORM | Drizzle ORM |
| Authentication | Clerk |
| AI | Google Gemini 2.0 Flash |
| Rate Limiting | Upstash Redis (sliding window) |
| UI Components | Radix UI (26 primitives) |
| Styling | Tailwind CSS + CSS variables |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |
| Date Utilities | date-fns 4 |
| Charts | Recharts |
| Icons | Lucide React |
| Unit Tests | Vitest |
| E2E Tests | Playwright |
| Deployment | Vercel (recommended) |

---

## Architecture

```
src/
├── app/
│   ├── (app)/dashboard/          # Protected dashboard route
│   │   └── _components/          # Dashboard-specific client components
│   ├── (auth)/                   # Sign-in / sign-up pages
│   ├── about/                    # About page
│   ├── globals.css               # Global styles & CSS variables
│   ├── layout.tsx                # Root layout (Clerk, ThemeProvider, Header, Footer)
│   └── page.tsx                  # Public landing page
│
├── components/
│   ├── layout/                   # Header, Footer, WelcomeMessage, UserProfile
│   └── ui/                       # 62 Radix-based UI primitives
│
├── features/
│   ├── billing/                  # Plan definitions, upgrade banner
│   ├── collections/              # Collection CRUD, card, sort, create sheet
│   └── tasks/                   # Task CRUD, card, search, AI dialog
│
├── lib/
│   ├── constants.ts              # CollectionColors enum (19 gradients)
│   ├── env.ts                    # Zod-validated environment config
│   ├── errors.ts                 # Client error types and helpers
│   ├── logger.ts                 # JSON structured logger
│   └── utils.ts                  # cn() className utility
│
└── server/
    ├── ai/                       # Gemini integration, prompts, NLP task parser
    ├── auth/                     # requireUser(), assertCollectionOwner(), assertTaskOwner()
    ├── db/                       # Drizzle client (lazy), schema (collections + tasks)
    ├── errors.ts                 # AppError class with typed error codes
    ├── rate-limit.ts             # Upstash rate limiters (mutation + AI)
    ├── repositories/             # Raw DB queries (task.repository, collection.repository)
    └── services/                 # Business logic (task.service, collection.service)
```

**Pattern:** Feature-sliced + layered. Each feature owns its own components, actions, schemas, hooks, and types. The server layer is split into services (business logic) and repositories (data access), keeping queries testable in isolation. Next.js Server Actions bridge the client and server without a separate API layer.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database
- A [Clerk](https://clerk.com) application
- (Optional) A [Google AI Studio](https://aistudio.google.com) API key for AI features
- (Optional) An [Upstash Redis](https://upstash.com) database for rate limiting

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Engraya/remindly.git
cd remindly

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Fill in the values — see Environment Variables below

# 4. Push the database schema
npm run db:push

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run E2E tests (Playwright) |
| `npm run db:push` | Push Drizzle schema to database |
| `npm run db:studio` | Open Drizzle Studio GUI |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string (with `sslmode=require`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key (safe to expose client-side) |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key (server-side only) |
| `GEMINI_API_KEY` | No | Google AI API key — enables natural language task creation |
| `UPSTASH_REDIS_REST_URL` | No | Upstash Redis URL — enables per-user rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis token |

```env
# .env.example

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/db?sslmode=require

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional: AI features
# GEMINI_API_KEY=AIza...

# Optional: Rate limiting (Upstash Redis)
# UPSTASH_REDIS_REST_URL=
# UPSTASH_REDIS_REST_TOKEN=
```

The app runs without `GEMINI_API_KEY` — AI task creation is disabled and returns a descriptive error. It runs without Upstash credentials — rate limiting is silently skipped.

---

## Server Actions

Remindly uses Next.js Server Actions instead of a REST API. The key actions are:

### Tasks

| Action | Auth | Rate Limit | Description |
|---|---|---|---|
| `createTaskAction` | Required | 30/min | Creates a task with content, collection, and optional deadline |
| `createTaskFromNaturalLanguageAction` | Required | 10/min (AI) | Parses plain English input via Gemini, then creates a task |
| `setTaskToDoneAction` | Required | 30/min | Marks a task as complete |

### Collections

| Action | Auth | Rate Limit | Description |
|---|---|---|---|
| `getUserCollectionsAction` | Required | — | Returns all collections with their tasks for the current user |
| `createCollectionAction` | Required | 30/min | Creates a collection with a name and color |
| `deleteCollectionAction` | Required | 30/min | Deletes a collection and all its tasks (cascade) |

All actions validate input with Zod, check resource ownership, and return typed results or throw `AppError`.

---

## AI Integration

Natural language task creation is powered by **Google Gemini 2.0 Flash**.

**Flow:**
1. User types a description (8–500 characters) in the AI task dialog
2. The input is sanitized — control characters stripped, whitespace trimmed
3. A POST request is sent to `generativelanguage.googleapis.com` with `responseMimeType: "application/json"` to guarantee structured output
4. Gemini returns `{ content: string, expiresAt: string | null }` — the task description and an ISO 8601 deadline (or null if no date was mentioned)
5. The response is validated with Zod before being written to the database

**System prompt:**
> "You extract structured task data from natural language. Return JSON only with: content (string, min 8 chars, the task description) and expiresAt (ISO 8601 date string or null if no deadline mentioned)"

**Rate limit:** 10 requests per minute per user (Upstash sliding window).

**Graceful degradation:** If `GEMINI_API_KEY` is not set, the action throws an `INTERNAL` error with a descriptive message. No crash, no silent failure.

---

## Billing Plans

| Feature | Free | Pro |
|---|---|---|
| Collections | 10 | 100 |
| AI tasks per day | 5 | 100 |
| Tasks per collection | Unlimited | Unlimited |

Plan logic lives in `src/features/billing/plans.ts`. The upgrade banner is shown on the dashboard.

---

## Performance Optimizations

- **Server-side data fetching** — The dashboard page is a Server Component that fetches all collections and tasks before sending HTML to the client. First meaningful paint requires zero client-side data fetches.
- **Dynamic imports** — `CreateCollectionSheet` and `NaturalLanguageTaskDialog` are imported with `next/dynamic`. They are excluded from the initial bundle and loaded only when triggered.
- **Proxy-based lazy DB client** — The Neon client is wrapped in a JavaScript `Proxy`. The actual connection is established only on first database access, not at module load time. This prevents `DATABASE_URL` errors during `next build`.
- **Scoped cache invalidation** — `revalidatePath("/dashboard")` is called after mutations instead of invalidating the full cache.
- **Debounced search** — The collection/task search filter debounces at 200 ms.
- **Sliding window rate limiting** — Upstash's sliding window algorithm prevents burst abuse without penalizing legitimate usage patterns.

---

## Deployment

### Vercel (Recommended)

Remindly is optimized for Vercel deployment.

1. Push your repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables in the Vercel project settings
4. Deploy — Vercel detects Next.js automatically

```bash
# Or deploy via CLI
npx vercel --prod
```

### Self-Hosted

```bash
npm run build
npm run start
```

Requires Node.js 18+ and all environment variables set in the process environment.

---

## Screenshots

| Landing Page | Dashboard |
|---|---|
| ![Landing](screenshots/landing.png) | ![Dashboard](screenshots/dashboard.png) |

| Create Collection | AI Task Dialog |
|---|---|
| ![Create Collection](screenshots/create-collection.png) | ![AI Task](screenshots/ai-task.png) |

> Add screenshots to a `screenshots/` directory in the project root.

---

## Developer Notes

**Repository pattern:** Queries are isolated in repository files (`task.repository.ts`, `collection.repository.ts`). Services call repositories and apply business rules (ownership checks, rate limiting). This separation makes unit testing services trivial — repositories are mocked at the service boundary.

**Error propagation:** `AppError` carries a typed `code` string (`VALIDATION`, `FORBIDDEN`, `RATE_LIMITED`, `INTERNAL`, `NOT_FOUND`, `UNAUTHORIZED`). Server actions catch `AppError` and return the code to the client, which maps codes to user-facing messages. There is no stringly-typed error handling anywhere in the stack.

**Drizzle schema as single source of truth:** TypeScript types for `Collection` and `Task` are inferred directly from the Drizzle schema using `$inferSelect`. There are no separately maintained type definitions for database entities.

**Color system:** The 19 collection colors are Tailwind gradient classes stored in a `CollectionColors` enum. The color grid in the create-collection sheet iterates over this enum. Adding a new color requires a single line in `constants.ts`.

**Authentication scope:** Clerk handles session management entirely. The app calls `currentUser()` in server code to get the user ID, which is used as a partition key for all database queries. There is no custom session table.

---

## Roadmap

- **Collection sharing** — Share a collection with other users via invite link with read-only or edit access
- **Recurring tasks** — Schedule tasks to repeat daily, weekly, or on a custom cadence
- **Deadline notifications** — Email or push reminders when task deadlines approach
- **Pro plan enforcement** — Gate collection and AI task creation at the service layer when plan limits are reached
- **Bulk operations** — Select multiple tasks to mark complete or delete in one action
- **Export** — Download tasks as CSV or Markdown for use outside the app

---

## Contributing

Contributions are welcome. Please open an issue before submitting large changes.

```bash
# 1. Fork the repository and clone your fork
git clone https://github.com/your-username/remindly.git
cd remindly

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes and add tests
npm run test

# 4. Commit with a descriptive message
git commit -m "feat: add recurring task support"

# 5. Push and open a Pull Request
git push origin feature/your-feature-name
```

**Code standards:**
- All new code must be TypeScript with no `any`
- New server actions must include input validation with Zod
- New service-layer logic must include unit tests
- Run `npm run test` before opening a PR

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  Built with Next.js, Clerk, Neon, and Gemini.
</div>
