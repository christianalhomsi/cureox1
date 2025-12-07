# Deploy CureOx Next to Vercel

## EASIEST: Deploy via Vercel CLI (No Git Required)

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This opens your browser - login with GitHub/GitLab/Email

### Step 3: Deploy

```bash
vercel --prod
```

Press Enter for all prompts. Done! Your site is live.

---

## Alternative: Deploy via GitHub (Requires Git)

### Step 1: Install Git

Download from: **https://git-scm.com/download/win**

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/cureox-next.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to **https://vercel.com/new**
2. Import your repository
3. Click **Deploy**

---

## What's Included

✅ `.gitignore` - Excludes build files from Git
✅ `vercel.json` - Vercel configuration
✅ All dependencies in `package.json`
✅ Next.js 16 optimized build
✅ No environment variables needed

## After Deployment

- **Custom Domain**: Add in Vercel dashboard → Settings → Domains
- **Auto Deploys**: Every push to `main` auto-deploys
- **Preview URLs**: Every PR gets a preview URL

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
