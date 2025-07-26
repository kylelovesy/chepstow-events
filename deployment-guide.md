# 🚀 Deployment Guide

This guide covers multiple deployment options for the Chepstow Events application, from simple static hosting to full-featured platforms.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Completed Supabase setup (see `supabase-setup-guide.md`)
- [ ] Tested the application locally
- [ ] Updated environment variables for production
- [ ] Built the application successfully
- [ ] Verified all features work as expected

## 🌟 Recommended: Vercel Deployment

Vercel offers the best experience for React applications with automatic deployments and excellent performance.

### Step 1: Prepare Your Repository

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/chepstow-events.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Visit Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/in with your GitHub account

2. **Import Project**:
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Environment Variables**:
   - In the deployment settings, add:
     ```
     VITE_SUPABASE_URL=https://your-project-id.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-app-name.vercel.app`

### Step 3: Update Supabase Settings

1. **Add Production URL**:
   - Go to your Supabase dashboard
   - Navigate to Authentication > Settings
   - Add your Vercel URL to "Site URL"
   - Add it to "Redirect URLs" as well

### Step 4: Custom Domain (Optional)

1. **Add Domain in Vercel**:
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## 🌐 Alternative: Netlify Deployment

Netlify is another excellent option for static site hosting.

### Step 1: Build the Application

```bash
pnpm run build
```

### Step 2: Deploy to Netlify

**Option A: Drag and Drop**
1. Go to [netlify.com](https://netlify.com)
2. Drag the `dist` folder to the deployment area

**Option B: Git Integration**
1. Connect your GitHub repository
2. Set build command: `pnpm run build`
3. Set publish directory: `dist`
4. Add environment variables in site settings

### Step 3: Configure Environment Variables

In Netlify dashboard:
1. Go to Site Settings > Environment Variables
2. Add:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 🏠 Self-Hosted Deployment

For more control, you can self-host the application.

### Option 1: Static File Server

1. **Build the application**:
   ```bash
   pnpm run build
   ```

2. **Serve the dist folder** with any web server:
   ```bash
   # Using Python
   cd dist
   python -m http.server 8000
   
   # Using Node.js serve
   npx serve dist
   
   # Using nginx (copy dist contents to web root)
   sudo cp -r dist/* /var/www/html/
   ```

### Option 2: Docker Deployment

1. **Create Dockerfile**:
   ```dockerfile
   # Build stage
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   
   # Production stage
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**:
   ```nginx
   events {
     worker_connections 1024;
   }
   
   http {
     include /etc/nginx/mime.types;
     default_type application/octet-stream;
     
     server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;
       
       location / {
         try_files $uri $uri/ /index.html;
       }
     }
   }
   ```

3. **Build and run**:
   ```bash
   docker build -t chepstow-events .
   docker run -p 8080:80 chepstow-events
   ```

## 🔧 Environment Configuration

### Development vs Production

Create different environment files:

**`.env.local`** (Development):
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**`.env.production`** (Production):
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Security Considerations

1. **Environment Variables**:
   - Never commit `.env` files to version control
   - Use platform-specific environment variable settings
   - The `VITE_` prefix makes variables available to the client

2. **Supabase Security**:
   - The anon key is safe to expose (it's public by design)
   - Row Level Security (RLS) protects your data
   - Always use HTTPS in production

## 📊 Performance Optimization

### Build Optimization

1. **Analyze Bundle Size**:
   ```bash
   pnpm run build
   npx vite-bundle-analyzer dist
   ```

2. **Enable Compression**:
   - Most hosting platforms enable gzip automatically
   - For self-hosting, configure your web server for compression

### Caching Strategy

1. **Static Assets**:
   - Images, fonts: Cache for 1 year
   - JS/CSS: Cache with hash-based filenames

2. **API Responses**:
   - Supabase handles caching automatically
   - Consider implementing client-side caching for better UX

## 🔍 Monitoring and Analytics

### Error Tracking

1. **Sentry Integration** (Optional):
   ```bash
   pnpm add @sentry/react @sentry/vite-plugin
   ```

2. **Configure in main.jsx**:
   ```javascript
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "YOUR_SENTRY_DSN",
   });
   ```

### Analytics

1. **Google Analytics** (Optional):
   ```bash
   pnpm add gtag
   ```

2. **Add to index.html**:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

## 🚨 Troubleshooting Deployment

### Common Issues

1. **Build Failures**:
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   pnpm install
   pnpm run build
   ```

2. **Environment Variable Issues**:
   - Ensure variables start with `VITE_`
   - Check platform-specific environment variable settings
   - Verify variables are set in production environment

3. **Routing Issues**:
   - Configure your hosting platform for SPA routing
   - Ensure all routes redirect to `index.html`

4. **Supabase Connection Issues**:
   - Verify URL and API key are correct
   - Check Supabase dashboard for any service issues
   - Ensure production URL is added to Supabase settings

### Debug Steps

1. **Check Browser Console**:
   - Look for JavaScript errors
   - Verify network requests are successful

2. **Verify Environment Variables**:
   ```javascript
   console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
   ```

3. **Test API Connectivity**:
   - Try authentication in production
   - Verify database queries work

## 📈 Scaling Considerations

### Supabase Limits (Free Tier)

- **Database**: 500MB storage
- **Auth**: 50,000 monthly active users
- **API**: 500MB data transfer
- **Storage**: 1GB file storage

### Upgrade Path

When you outgrow the free tier:

1. **Supabase Pro**: $25/month
   - 8GB database storage
   - 100,000 monthly active users
   - 50GB data transfer

2. **CDN Integration**: For better global performance
3. **Database Optimization**: Indexes, query optimization
4. **Caching Layer**: Redis for frequently accessed data

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] Test all functionality in production
- [ ] Verify authentication works
- [ ] Test event creation, editing, and deletion
- [ ] Check search and filtering features
- [ ] Verify responsive design on mobile devices
- [ ] Test with multiple users
- [ ] Set up monitoring and alerts
- [ ] Document the production URL for your team

## 🎉 Success!

Your Chepstow Events application is now live and ready for your family and friends to use for planning amazing summer holiday adventures!

Remember to:
- Share the URL with your collaborators
- Create user accounts for everyone
- Start adding those exciting summer events
- Enjoy your well-organized holiday planning! 🐆✨

