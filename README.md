# DM Sea Kayak

A static landing page for sea kayaking tours and lessons, packaged for one-click
deployment on [Coolify](https://coolify.io).

## Local preview

Just open `index.html` in a browser, or serve it:

```bash
# any static server works, e.g.
python -m http.server 8080
# then visit http://localhost:8080
```

## Run with Docker

```bash
docker build -t dmseakayak .
docker run -p 8080:80 dmseakayak
# visit http://localhost:8080
```

## Deploy on Coolify

1. In Coolify, create a new **Resource → Application**.
2. Choose **Public Repository** (or connect your GitHub) and point it at
   `https://github.com/ubterzioglu/dmseakayak`.
3. Set **Build Pack** to **Dockerfile** (the included `Dockerfile` is auto-detected).
4. Coolify exposes the container's **port 80** — leave the default; map your domain
   in the **Domains** field.
5. Click **Deploy**. The built-in `HEALTHCHECK` lets Coolify confirm the app is live.

Subsequent pushes to the default branch trigger automatic redeploys when
**Auto Deploy** is enabled.

## Files

| File          | Purpose                                          |
|---------------|--------------------------------------------------|
| `index.html`  | The full single-page site (self-contained)       |
| `Dockerfile`  | Builds an nginx image serving the static site    |
| `nginx.conf`  | nginx server config (caching, gzip, headers)     |
| `.dockerignore` | Keeps the image lean                           |
