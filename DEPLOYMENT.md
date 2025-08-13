# CLCK Deployment Guide

## Problem Solved: Contentful Data Not Updating on VPS

### The Issue
- Contentful data shows locally but not on VPS after updates
- Pages are statically generated at build time
- No automatic refresh mechanism

### Solution: Incremental Static Regeneration (ISR)

We've added ISR to all pages that fetch Contentful data:

1. **Main pages with ISR:**
   - `/` (home page)
   - `/blog-news` (blog listing)
   - `/blog-news/[slug]` (individual blog posts)
   - `/about-us`
   - `/services`
   - `/services/[id]` (individual service pages)
   - `/pricing`
   - `/contact-us`
   - `/faqs`
   - `/plans` (auth section)

2. **ISR Configuration:**
   - `export const revalidate = 60` - Pages regenerate every 60 seconds
   - Updated cache headers for better ISR support

## Deployment Process

### Quick Rebuild (Recommended)
```bash
# Make the rebuild script executable
chmod +x rebuild.sh

# Run the rebuild script
./rebuild.sh
```

### Manual Rebuild
```bash
# Navigate to CLCK directory
cd CLCK

# Install dependencies (if needed)
npm install

# Build the application
npm run build

# Restart PM2 process
pm2 restart clck-app
```

## How ISR Works

1. **First Request:** Page is generated and cached
2. **Subsequent Requests:** Served from cache for 60 seconds
3. **After 60 seconds:** Next request triggers background regeneration
4. **New Content:** Automatically available without rebuild

## Benefits

- ✅ New Contentful data appears automatically
- ✅ No need to rebuild for every content update
- ✅ Fast page loads (cached content)
- ✅ SEO-friendly (static generation)
- ✅ Fallback data if Contentful is down

## Monitoring

Check if ISR is working:
```bash
# View PM2 logs
pm2 logs clck-app

# Check application status
pm2 status
```

## Troubleshooting

### If content still doesn't update:
1. Check Contentful API credentials in environment variables
2. Verify network connectivity to Contentful
3. Check PM2 logs for errors
4. Try a full rebuild: `./rebuild.sh`

### If pages are slow:
- Increase revalidate time (e.g., `export const revalidate = 300` for 5 minutes)
- Check server resources

## Environment Variables

Ensure these are set in your VPS:
```bash
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
```

## Notes

- ISR works best with stable content that doesn't change frequently
- The 60-second revalidation is a good balance between freshness and performance
- You can adjust the revalidation time based on your content update frequency
