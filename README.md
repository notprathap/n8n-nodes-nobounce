# n8n-nodes-nobounce

Official [n8n](https://n8n.io/) community node for **[NoBounce Email Validation & Bulk Verification API](https://nobounceapi.com)** — verify email syntax, live DNS/MX records, 150+ disposable email providers, role-based accounts, free webmail domains, and domain typo suggestions (`did_you_mean`) in **~15ms** at **75% lower cost** than ZeroBounce, NeverBounce, and Kickbox.

[![npm version](https://img.shields.io/npm/v/n8n-nodes-nobounce.svg)](https://www.npmjs.com/package/n8n-nodes-nobounce)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)

---

## Features

- **Validate Single Email (`GET /api/validate`)**: Real-time verification for lead forms, webhook triggers, HubSpot/Salesforce CRM enrichment, and cold outbound pipelines (Instantly, Smartlead, Apollo).
- **Validate Bulk Emails (`POST /api/validate-bulk`)**: Verify up to **5,000 email addresses** in a single batch call with aggregate deliverability statistics (`valid_percentage`, `disposable_emails`, `role_account_emails`).
- **n8n AI Agent Tool Ready (`usableAsTool: true`)**: Attach the NoBounce node directly as a tool to any **n8n AI Agent** node so your LLM agents can verify prospect emails before sending outreach.
- **Zero-Config Free Sandbox Mode**: Test immediately inside n8n using the built-in **Free Sandbox (100 validations/mo)** option, or connect your API key from [nobounceapi.com/dashboard](https://nobounceapi.com/dashboard).

---

## Installation in n8n

Follow the [n8n community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. Open your n8n instance and go to **Settings → Community Nodes**.
2. Click **Install a community node**.
3. Enter `n8n-nodes-nobounce` in **npm Package Name**.
4. Acknowledge the prompt and click **Install**.

---

## Pricing Comparison

| Monthly Volume | NoBounce API | ZeroBounce | NeverBounce | Kickbox |
| :--- | :--- | :--- | :--- | :--- |
| **100 / mo** | **$0 Free Forever** | 100 one-time | 10 one-time | 100 one-time |
| **2,500 / mo** | **$9 / mo** | $20 | $20 | $25 |
| **10,000 / mo** | **$39 / mo** | $75 | $50 | $80 |
| **100,000 / mo** | **$99 / mo** | $390 | $400 | $400 |

Full interactive calculator & setup guide: **[https://nobounceapi.com/compare/n8n-email-validation](https://nobounceapi.com/compare/n8n-email-validation)**

---

## Example Response (`Validate Single Email`)

```json
{
  "email": "contact@github.com",
  "is_valid": true,
  "reason": "Email passed all validation checks",
  "domain": "github.com",
  "did_you_mean": null,
  "checks": {
    "syntax": true,
    "domain_exists": true,
    "mx_records": true,
    "is_disposable": false,
    "is_role_account": false,
    "is_free_email": false
  },
  "mx_records": [
    "1 aspmx.l.google.com.",
    "5 alt1.aspmx.l.google.com."
  ],
  "remaining_validations": 99
}
```

---

## License

MIT © [NoBounce API](https://nobounceapi.com)
