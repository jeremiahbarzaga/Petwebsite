SMTP setup

This project sends appointment requests via SMTP using `nodemailer`.

Required environment variables (create a `.env.local` file):

- `SMTP_HOST` — SMTP server host (e.g. `smtp.gmail.com`)
- `SMTP_PORT` — SMTP port (usually `465` for SSL or `587` for TLS)
- `SMTP_USER` — SMTP username (your SMTP email account)
- `SMTP_PASS` — SMTP password (use an app password for Gmail)
- `TO_EMAIL` — Destination email (defaults to jeremiahbarzaga511@gmail.com if not set)

Example `.env.local`:

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=zayadigitalsolutions@gmail.com
SMTP_PASS=loofiwlzrjllkjal
TO_EMAIL=jeremiahbarzaga511@gmail.com

Install the new dependency and run locally:

```bash
npm install
npm run dev
```

Notes:
- For Gmail, enable 2FA and create an App Password to use as `SMTP_PASS`.
- Never commit `.env.local` to source control.
