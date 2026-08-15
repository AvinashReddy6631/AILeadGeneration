# n8n integration boundary

n8n is intended to orchestrate lead capture, enrichment, AI scoring, follow-ups, and notifications.

The browser should call the Leads AI REST API. Server-side route handlers in `app/api/` will validate requests, persist data, and call n8n through `lib/n8n/`. Incoming n8n events should target `/api/webhooks/n8n`, where webhook signatures can be verified before application state is updated.

The JSON files in `workflows/` are placeholders only; they do not contain executable nodes or credentials.
