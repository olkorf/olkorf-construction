# Website inquiry email setup

Contact and estimate forms POST to `/api/inquiries`. The recipient is fixed server-side to info@olkorfconstruction.com. Calculator details are included in the estimate message. Emails include every customer field in both HTML and plain text. No customer records are stored locally.

## Activation (required before launch)

1. Confirm info@olkorfconstruction.com is a working mailbox or forwarding address.
2. In Cloudflare, open Compute > Email Service > Email Sending and onboard olkorfconstruction.com. Review the proposed authentication DNS records; preserve existing mailbox MX records and existing DMARC policy. Sending is currently documented as beta; confirm account access.
3. Create a narrowly scoped token with Email Sending permission for this account. Store it as CLOUDFLARE_EMAIL_API_TOKEN in the hosting provider's secret environment settings (and .env.local for local testing). Never put it in a NEXT_PUBLIC variable or source control.
4. Set CLOUDFLARE_ACCOUNT_ID and INQUIRY_FROM_EMAIL=website@olkorfconstruction.com. Restart/redeploy the Next.js server. A static-only export cannot run this endpoint.
5. Submit one contact and one estimate request, including every optional field and calculator details. Confirm receipt in the actual inbox and inspect the message contents. No real delivery has yet been verified.
6. Configure an edge rate limit for POST /api/inquiries on the production host before public launch. The endpoint includes a honeypot, same-origin check, input validation, and a 24 KB request limit; these are not a distributed rate limiter.

Missing credentials, provider failures, and bounces return an error and preserve the visitor's input. Success means the provider reports delivered or queued, not a guarantee of inbox placement. A timeout may occur after provider acceptance; a retry can duplicate a message. Check Cloudflare email logs for delivery issues.

Official setup: https://developers.cloudflare.com/email-service/get-started/send-emails/
API: https://developers.cloudflare.com/email-service/api/send-emails/rest-api/
