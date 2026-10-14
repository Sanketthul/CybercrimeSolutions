# Cybercrime Solutions frontend

React 18 application for cybercrime awareness, reporting and complaint tracking.

## Run locally

1. Install Node.js 18+.
2. Run `npm install` in this folder.
3. Copy `.env.example` to `.env` and set `REACT_APP_API_URL=http://localhost:4000` for a local API.
4. Run `npm start` and open `http://localhost:3000`.

For a production build, configure `REACT_APP_API_URL` to your deployed backend URL before running `npm run build`. CRA embeds this value at build time; never put database credentials or signing secrets in frontend environment variables.

See the root `README.md` for API setup, administrator provisioning, deployment and security notes.
