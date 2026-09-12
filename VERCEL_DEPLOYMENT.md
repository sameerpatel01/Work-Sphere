# WorkSphere — Vercel Deployment Guide

This repository is pre-configured for seamless full-stack deployment on **Vercel** with:
- **Frontend**: Vite React Single Page Application (hosted on Vercel's global Edge CDN)
- **Backend**: Express.js API executed as Vercel Serverless Functions (`/api/*`)
- **Single Origin**: Frontend and Backend share the same domain on Vercel, eliminating CORS and cross-domain cookie issues.

---

## Step 1: Push Changes to GitHub

Commit and push your updated codebase to your GitHub repository:

```bash
git add .
git commit -m "Configure WorkSphere for Vercel deployment"
git push origin main
```

---

## Step 2: Set Up MongoDB Atlas (Cloud Database)

> [!IMPORTANT]
> **Why is MongoDB Atlas required?**
> Your local database (`127.0.0.1:27017`) only exists on your laptop. Vercel runs in the cloud and cannot connect to your laptop. You need a free cloud MongoDB database:

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign in.
2. Create a free **M0 Cluster** (Free Forever).
3. Under **Security** → **Database Access**:
   - Create a database user with a username and password.
4. Under **Security** → **Network Access**:
   - Click **Add IP Address** → choose **Allow Access From Anywhere** (`0.0.0.0/0`) so Vercel's serverless functions can connect.
5. Click **Connect** → **Drivers** → Copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

## Step 3: Import Project in Vercel

1. Log in to [vercel.com](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Select your GitHub repository: **`sameerpatel01/Career-connect`** (or `Work-Sphere`).
4. In the Project Configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave default)
   - **Build and Output Settings**: Defaults will automatically use `vercel.json`.

---

## Step 4: Configure Environment Variables in Vercel

Before clicking Deploy, expand **Environment Variables** and add the following:

| Variable Name | Value / Description | Example |
| :--- | :--- | :--- |
| `DB_URL` | Your MongoDB Atlas connection URI | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `JWT_SECRET_KEY` | Secret key used to sign auth tokens | `9147db6c4a683ccfbb618b905b7d8af0601a8bc734e2a70c1d72a59f5ae420d2` |
| `JWT_EXPIRE` | Token validity duration | `7d` |
| `COOKIE_EXPIRE` | Cookie lifetime (days) | `7` |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | `Career-connect` |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | `736721934976277` |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret | `BECm1V56T-8tGQaX2TFaQqTJFik` |
| `NODE_ENV` | Production environment flag | `production` |

> [!TIP]
> `FRONTEND_URL` and `VITE_API_URL` are **optional** when deployed on Vercel because both frontend and API are hosted under the same domain. If you want to specify `FRONTEND_URL`, set it to your Vercel URL (e.g. `https://your-project.vercel.app`).

---

## Step 5: Deploy & Verify

1. Click **Deploy**.
2. Wait 1–2 minutes for the build to complete.
3. Open your deployed Vercel URL:
   - Visit `/` to verify the WorkSphere landing page.
   - Test User Registration / Login.
   - Test Job Posting and Application submissions.
