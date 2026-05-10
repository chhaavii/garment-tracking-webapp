# GitHub Pages Deployment Instructions

## Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `garment-tracking-webapp` 
3. Make it **Public**
4. Don't initialize with README
5. Click "Create repository"

## Step 2: Push Your Code
Replace `YOUR_USERNAME` with your GitHub username and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/garment-tracking-webapp.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click Settings → Pages
3. Source: Select "GitHub Actions"
4. Save

## Step 4: Wait for Deployment
- GitHub Actions will automatically build and deploy your site
- Your site will be available at: `https://YOUR_USERNAME.github.io/garment-tracking-webapp`
- Check the Actions tab to see deployment progress

## What's Configured
✅ Automatic deployment on every push to main branch
✅ Builds web version using Expo
✅ Deploys to GitHub Pages
✅ Uses GitHub Actions CI/CD
