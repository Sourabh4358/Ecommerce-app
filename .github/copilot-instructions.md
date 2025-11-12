## Quick orientation for AI coding agents

This repository is a small full-stack React + Vite frontend and Express + Node backend. The goal of this file is to capture concrete, discoverable patterns and commands an AI needs to be productive here.

### How to run (dev)
- Start the backend (uses ES modules, `.js` extensions):
  - cd server && npm install && npm run dev (nodemon runs `services.js`)
  - Key file: `server/services.js` (loads `.env`, connects to MongoDB via `process.env.MONGO_URI`).
- Start the frontend (Vite):
  - cd client && npm install && npm run dev (serves at http://localhost:5173)
  - Key file: `client/package.json` (scripts: `dev`, `build`, `preview`).

Run both in separate terminals to test full-stack flows. There is no single root script to run both.

### Big-picture architecture
- Frontend: `client/src` — React (Vite), React Router, Redux Toolkit, Tailwind CSS. App entry: `client/src/main.jsx` -> `App.jsx`.
- Backend: `server` — Express with Mongoose. Entry: `server/services.js`. Routes live under `server/routes` and controllers under `server/controllers`.
- API contract: server mounts auth routes at `/api/auth` (see `server/services.js` and `server/routes/auth/auth-routes.js`).

### Concrete integration points & examples
- Registration endpoint: POST `/api/auth/register` with body { username, email, password } -> controller: `server/controllers/auth/auth-controller.js` (uses `User` model `server/models/User.js`).
- CORS is configured to allow origin `http://localhost:5173` in `server/services.js` — update if frontend host changes.

### Project-specific conventions and patterns
- ES modules everywhere (import ... from '...';). When editing server files keep the `.js` extension in imports (e.g. `import authRouter from './routes/auth/auth-routes.js'`).
- Redux slices follow a folder-per-slice convention. Example: `client/src/store/auth-slice/index.js` exports the reducer as default and action creators from the slice. Store is configured in `client/src/store/store.js`.
- React routing uses `react-router-dom` v7-style nesting in `client/src/App.jsx`. Many routes are guarded with `CheckAuth` component (`client/src/components/comman/check-auth.jsx`).
- UI components live under `client/src/components/ui` (e.g., `button.jsx`, `input.jsx`, `sonner.jsx` for Toaster usage).
- Styling: Tailwind classes in JSX; `index.css` and `App.css` contain global styles.

### Coding constraints for automated edits
- Keep server imports as ES modules and keep `.js` extensions on relative imports.
- When adding routes: register them in `server/services.js` (app.use('/api/your', yourRouter)).
- When changing client routes, update `client/src/App.jsx` and ensure corresponding pages/components exist under `client/src/pages` or `client/src/components`.
- State shape: auth slice expects { isAuthenticated, isLoading, user, error } — follow this when wiring components or thunks.

### Common tasks & where to look
- Add new API endpoint: add `server/routes/<name>/<route>.js` -> add controller in `server/controllers/<name>` -> register route in `server/services.js`.
- Add Redux async logic: createAsyncThunk + handle pending/fulfilled/rejected in `extraReducers` inside `client/src/store/<slice>/index.js` and export actions/reducer consistently.
- Debugging: check console logs from `nodemon` for server, and Vite output for client. Mongo connection string is read from `.env` via `process.env.MONGO_URI`.

### Files you should inspect before making edits (highest value)
- `server/services.js` — server bootstrap, CORS, route mounting, and DB connect.
- `server/controllers/auth/auth-controller.js` — example controller logic and error responses.
- `server/models/User.js` — Mongoose schema patterns.
- `client/package.json` and `client/src/main.jsx` — how frontend starts and mounts App with Redux store.
- `client/src/store/auth-slice/index.js` and `client/src/store/store.js` — how slices are wired.
- `client/src/App.jsx` — routing and guarded route examples.

### Examples (copy-ready)
- Register user (curl):
  - curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"u","email":"e@x.com","password":"p"}'
- Frontend dev: open `http://localhost:5173` after `cd client && npm run dev`.

### Notes & limitations
- There are no automated tests or CI config in this repo. Be conservative when changing shared shapes (e.g., auth state, API request/response shapes).
- Login route is a placeholder in `server/controllers/auth/auth-controller.js` — treat it as incomplete.

If anything above is unclear or you want more specific examples (code snippets for adding a route, thunk, or component), say which area you'd like expanded and I'll iterate.
