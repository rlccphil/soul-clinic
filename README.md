# RLCC Soul Clinic — Intake & Referral (GitHub Pages)

Static front end on GitHub Pages; Google Apps Script is the back end (Sheet, PDFs, email).

- `index.html` — public confidential intake form
- `leader.html` — ministry leader review (email code sign-in)
- `api.js` — bridge replacing `google.script.run`; **set `SOUL_CLINIC_API_URL` here**
- `apps-script/Code.gs` — back end with `doGet`/`doPost` JSON API

## Setup
1. **Apps Script:** replace your project's `Code.gs` with `apps-script/Code.gs` (you can delete `Index.html` and `Leader.html` there). If this is a new project, run `setup()` once and add leader emails in Settings.
2. **Deploy → New deployment → Web app:** Execute as *Me*, access *Anyone*. Copy the `/exec` URL.
   After any later Code.gs change, use *Manage deployments → Edit → New version* so the URL stays the same.
3. **Paste the `/exec` URL** into `api.js`.
4. **GitHub:** create a repo, upload `index.html`, `leader.html`, `api.js`, `README.md`. Settings → Pages → Deploy from branch → `main` / root.
5. Visit `https://<user>.github.io/<repo>/` (intake) and `.../leader.html` (leaders).

## Notes
- Test by opening the `/exec` URL in a browser: you should see `{"ok":true,...}`.
- The `/exec` URL is public; the leader endpoints are protected by the emailed code + 30‑minute session token, as before.
- The repo can be public because no data or secrets live in it, but keep the intake PDFs and Sheet private in Drive.
- The leader's "Open PDF" link grants Drive view access to that leader's Google account, same as before.

## Logo
Add your logo files to the repo root (same folder as `index.html`):
- `logo-white.png` — shown in the green header on both pages
- `logo-green.png` — optional, used as the browser-tab icon

Until `logo-white.png` is added, the pages show the original text wordmark.

## Link preview (Open Graph image)
`og-image.png` (1200×630) is the preview shown when the intake link is shared on Messenger, Viber, WhatsApp, Facebook, etc.
In `index.html`, replace `https://YOUR-USERNAME.github.io/YOUR-REPO` (in the `og:url`, `og:image` and `twitter:image` tags) with your real GitHub Pages address. It must be a full `https://` URL.
Chat apps cache previews: after changing the image, re-scrape with the Facebook Sharing Debugger (developers.facebook.com/tools/debug).
