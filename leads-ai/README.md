# Leads AI

Leads AI is a Next.js App Router scaffold for AI-powered lead management and n8n automation.

## Architecture

- `app/` contains marketing, auth, dashboard, and server-side REST route boundaries.
- `components/` contains presentation-only UI placeholders.
- `lib/api/` is the future client/server API communication layer.
- `lib/n8n/` is the server-only n8n integration boundary.
- `lib/ai/` is reserved for future AI provider adapters and analysis.
- `types/`, `config/`, and `hooks/` keep shared contracts and UI composition separate.
- `n8n/workflows/` contains non-functional workflow placeholders until orchestration is configured.

## Rules

Keep secrets server-side, validate payloads at API boundaries, and have the browser communicate with application routes rather than n8n credentials directly. Database, authentication, AI, and real automation behavior are intentionally not implemented in this first scaffold.

## Environment

Copy `.env.example` into the deployment environment and provide values only when the corresponding integration is implemented.
