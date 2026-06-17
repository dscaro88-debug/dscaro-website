DS CARO lead archive

- `latest-leads.json`: latest 100 submissions archived by the app.
- `lead-ledger.ndjson`: append-only lead log for quick audits.

Local development writes here.
On Vercel, the app writes to `/tmp/dscaro-leads`, so durable production retention should still be handled by `LEAD_WEBHOOK_URL` and/or email delivery.
