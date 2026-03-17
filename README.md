# portfolio
My Portfolio

## Contact form email setup

The `/contact/submit` route sends emails via SMTP.

Set these environment variables before running `python app.py`:

- `SMTP_HOST` (default: `smtp.gmail.com`)
- `SMTP_PORT` (default: `465`)
- `SMTP_USERNAME` (your Gmail address)
- `SMTP_PASSWORD` (your Gmail App Password, not your normal password)
- `CONTACT_TO_EMAIL` (default: `olimasad@gmail.com`)
- `CONTACT_FROM_EMAIL` (optional, defaults to `SMTP_USERNAME`)

### Example (PowerShell)

```powershell
$env:SMTP_USERNAME="olimasad@gmail.com"
$env:SMTP_PASSWORD="your-16-char-app-password"
$env:CONTACT_TO_EMAIL="olimasad@gmail.com"
python app.py
```

### Quick setup in this repo

This project now reads values from a local `.env` file automatically.

1. Open `.env`
2. Set `SMTP_PASSWORD` to your Gmail **App Password**
3. Restart `python app.py`
