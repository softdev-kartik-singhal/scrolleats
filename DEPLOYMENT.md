# ScrollEats Deployment Guide

## Frontend Deployment (Netlify)

### Configuration Settings:
- **Base directory:** `frontend/ScrollEats`
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Branch to deploy:** `main`

### Steps:
1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Use the settings above
5. Click "Deploy site"

### Important:
After deployment, you need to update the API URLs in your frontend code to point to your deployed backend (not localhost:3000).

---

## Backend Deployment (Render)

Since Netlify only hosts static sites, you need to deploy your backend separately.

### Option 1: Deploy Backend to Render

1. Go to [Render](https://render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `scrolleats-backend`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node

5. Add Environment Variables:
   ```
   PORT=3000
   DB_URL=your_mongodb_atlas_url
   JWT_SECRET=your_secret_key
   IMAGEKIT_PUBLIC_KEY=your_key
   IMAGEKIT_PRIVATE_KEY=your_key
   IMAGEKIT_URL_ENDPOINT=your_endpoint
   ```

6. Click "Create Web Service"

### Option 2: Full-Stack on Render

Deploy both frontend and backend on Render for easier management.

---

## After Deployment

### Update Frontend API URLs

You need to update all API calls in your frontend to use the deployed backend URL instead of `http://localhost:3000`.

**Files to update:**
- `frontend/ScrollEats/src/pages/general/Home.jsx`
- `frontend/ScrollEats/src/pages/general/SavedReels.jsx`
- `frontend/ScrollEats/src/components/Reel.jsx`
- All auth pages

**Change from:**
```javascript
axios.get("http://localhost:3000/api/food", ...)
```

**To:**
```javascript
axios.get("https://your-backend.onrender.com/api/food", ...)
```

### Update CORS in Backend

Update `backend/src/app.js`:
```javascript
app.use(cors({
    origin: "https://scrolleats.netlify.app", // Your Netlify URL
    credentials: true
}));
```

---

## Recommended Approach

For a full-stack MERN app like ScrollEats, I recommend:

**Option A: Netlify (Frontend) + Render (Backend)**
- Frontend: https://scrolleats.netlify.app
- Backend: https://scrolleats-backend.onrender.com

**Option B: All on Render (Simpler)**
- Frontend: https://scrolleats.onrender.com
- Backend: https://scrolleats-api.onrender.com

Option B is simpler for beginners and keeps everything in one place.

---

## Need Help?

Let me know which deployment option you prefer, and I can:
1. Create environment variable configuration
2. Update API URLs in your code
3. Create deployment scripts
4. Help with any deployment issues
