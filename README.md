# Cybercrime Solutions

A React + Express + MongoDB application for cybercrime awareness, report submission, private complaint tracking and administrator case management. Existing educational pages and content remain in the React application.

## What's improved

- Modern responsive reporting page and refreshed sign-in, registration, user workspace and administrator dashboard.
- Complaint tracking IDs, private status lookup, case history and admin status changes.
- Administrator-only complaint, feedback and user-list endpoints.
- Server-side role checks; public registration can create **User** accounts only.
- JWT authentication with expiry, password hashing, request validation, response limits, rate limits and security headers.
- Database credentials and JWT signing secret are read from environment variables rather than source code.
- Complaint and feedback records are no longer exposed through public list endpoints.

## Requirements

- Node.js 18 or later and npm
- A MongoDB database (local or MongoDB Atlas)

## Local setup

Open two terminals from the repository root.

### 1. Configure and start the API

```bash
cd NODE
npm install
```

Copy `NODE/.env.example` to `NODE/.env`, then set:

- `MONGODB_URI`: your MongoDB connection string
- `JWT_SECRET`: a randomly generated secret with at least 32 characters
- `PORT`: normally `4000`
- `CLIENT_ORIGIN`: your frontend origin, normally `http://localhost:3000`

Example secret generation:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Start the API:

```bash
npm start
```

The API starts only after MongoDB connects. Check `http://localhost:4000/api/health` for service status.

### 2. Start the React frontend

In a second terminal:

```bash
cd frontend
npm install
```

Copy `frontend/.env.example` to `frontend/.env` and set `REACT_APP_API_URL=http://localhost:4000` (or your deployed API URL). Then run:

```bash
npm start
```

Open `http://localhost:3000`.

## Administrator account setup

Public registration deliberately cannot create admin accounts. Create a normal account through the signup page, then promote that account using a trusted MongoDB admin connection. In `mongosh`, select the database configured in `MONGODB_URI` and run:

```javascript
db.UserInfo.updateOne(
  { email: "admin@example.com" },
  { $set: { userType: "Admin" } }
)
```

Replace the email with the account you created and verify that `matchedCount` is `1`. Sign in again after promoting the account. Do not expose database admin credentials or add an admin secret to frontend code.

## Deploying

- Deploy `NODE` as a Node.js service and configure its environment variables in the hosting provider.
- Deploy `frontend` as a static React build and set `REACT_APP_API_URL` to the public API URL before building.
- Set `CLIENT_ORIGIN` to the exact deployed frontend origin(s), comma-separated if needed.
- Use HTTPS, restrict MongoDB network access, and use a least-privilege database user.
- The built-in in-memory rate limiter is suitable only for a single API instance. Use a shared rate-limit store such as Redis for multiple instances.

## Security actions required before public release

The original project archive contained a MongoDB connection string and a hardcoded JWT secret. Treat the old MongoDB password as compromised: rotate it in MongoDB Atlas immediately, review database access logs, and remove old secrets from Git history if this repository has been pushed. Add new secrets only to local `.env` files or deployment environment settings. A new secret does not revoke already-issued tokens until they expire; restart the API after updating it.

This project is an incident-reporting aid, not a replacement for official law-enforcement reporting or emergency support. For financial cyber fraud in India, contact your bank and call 1930 promptly; official reporting is available at https://cybercrime.gov.in/.
