# Deployment Guide for ResponsiveWorks Website

## Droplet Information
- **IP Address**: 67.205.144.75
- **Domain**: responsiveworks.com
- **DNS Provider**: Cloudflare

---

## Step 1: Configure Cloudflare DNS

Login to your Cloudflare dashboard and add these DNS records:

### Record 1 - Root Domain
- **Type**: A
- **Name**: @ (represents root domain)
- **IPv4 address**: 67.205.144.75
- **Proxy status**: Proxied (orange cloud icon - enables DDoS protection and CDN)
- **TTL**: Auto

### Record 2 - WWW Subdomain
- **Type**: A
- **Name**: www
- **IPv4 address**: 67.205.144.75
- **Proxy status**: Proxied (orange cloud icon)
- **TTL**: Auto

### Cloudflare SSL/TLS Settings
1. Go to SSL/TLS > Overview in Cloudflare dashboard
2. Set encryption mode to **Full** (or **Full (Strict)** if you set up SSL on the server)
   - **Flexible**: Visitor to Cloudflare encrypted, Cloudflare to server unencrypted
   - **Full**: Both encrypted, server can use self-signed certificate
   - **Full (Strict)**: Both encrypted with valid certificate (requires Let's Encrypt setup)

---

## Step 2: Deploy to DigitalOcean Droplet

### Upload Files to Droplet

**Option A: Using SCP**
```bash
# From your local machine (run from project directory)
scp -r . root@67.205.144.75:/root/responsiveworks-new
```

**Option B: Using Git (Recommended)**
```bash
# First, push your code to GitHub if you haven't already
git add .
git commit -m "Prepare for deployment"
git push origin master

# Then SSH into your droplet and clone
ssh root@67.205.144.75

# On the droplet
cd /root
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git responsiveworks-new
cd responsiveworks-new
```

### Install Node.js on Droplet
```bash
# SSH into your droplet (if not already connected)
ssh root@67.205.144.75

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Install Dependencies and Build
```bash
# Navigate to project directory
cd /root/responsiveworks-new

# Install dependencies
npm install

# Build the Next.js project
npm run build
```

---

## Step 3: Install and Configure Nginx

Nginx will act as a reverse proxy, forwarding requests from port 80/443 to your Next.js app on port 3000.

```bash
# Install Nginx
apt-get update
apt-get install -y nginx

# Copy the nginx configuration from your project
cp /root/responsiveworks-new/nginx.conf /etc/nginx/sites-available/responsiveworks

# Create symbolic link to enable the site
ln -s /etc/nginx/sites-available/responsiveworks /etc/nginx/sites-enabled/

# Remove default Nginx configuration
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration for syntax errors
nginx -t

# If test passes, restart Nginx
systemctl restart nginx

# Enable Nginx to start on boot
systemctl enable nginx
```

---

## Step 4: Install PM2 and Start Application

PM2 is a production process manager that keeps your app running and restarts it if it crashes.

```bash
# Install PM2 globally
npm install -g pm2

# Start the application using the ecosystem file
cd /root/responsiveworks-new
pm2 start ecosystem.config.js

# Save the PM2 process list (so it persists across reboots)
pm2 save

# Set PM2 to start on system boot
pm2 startup
# IMPORTANT: Run the command that PM2 outputs above

# Check application status
pm2 status

# View logs
pm2 logs responsiveworks
```

---

## Step 5: Configure Firewall (UFW)

Secure your droplet by allowing only necessary ports.

```bash
# Allow SSH (port 22)
ufw allow 22/tcp

# Allow HTTP (port 80)
ufw allow 80/tcp

# Allow HTTPS (port 443)
ufw allow 443/tcp

# Enable firewall
ufw enable

# Check firewall status
ufw status verbose
```

---

## Step 6 (Optional): Set Up SSL with Let's Encrypt

If you want SSL directly on your server (recommended for Cloudflare Full (Strict) mode):

```bash
# Install Certbot
apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate for both domain and www subdomain
certbot --nginx -d responsiveworks.com -d www.responsiveworks.com

# Follow the prompts:
# - Enter your email address
# - Agree to terms of service
# - Choose whether to redirect HTTP to HTTPS (recommended: yes)

# Test automatic renewal
certbot renew --dry-run
```

**Note**: Certbot will automatically modify your Nginx configuration to use HTTPS and set up auto-renewal.

---

## Verification Steps

### 1. Test Direct IP Access
```bash
curl http://67.205.144.75
```
This should return your website HTML.

### 2. Check DNS Propagation
Visit https://dnschecker.org and enter:
- `responsiveworks.com`
- `www.responsiveworks.com`

Both should show IP: 67.205.144.75

### 3. Test Domain Access
- Visit: http://responsiveworks.com
- Visit: http://www.responsiveworks.com
- Visit: https://responsiveworks.com
- Visit: https://www.responsiveworks.com

All should load your website.

---

## Useful Management Commands

### PM2 Process Management
```bash
pm2 status                    # View all processes
pm2 restart responsiveworks   # Restart the app
pm2 stop responsiveworks      # Stop the app
pm2 start responsiveworks     # Start the app
pm2 logs responsiveworks      # View logs
pm2 logs responsiveworks --lines 100  # View last 100 lines
pm2 monit                     # Real-time monitoring
pm2 delete responsiveworks    # Remove from PM2
```

### Nginx Management
```bash
systemctl status nginx        # Check Nginx status
systemctl restart nginx       # Restart Nginx
systemctl stop nginx          # Stop Nginx
systemctl start nginx         # Start Nginx
nginx -t                      # Test configuration
tail -f /var/log/nginx/error.log    # View error logs
tail -f /var/log/nginx/access.log   # View access logs
```

### Application Updates
When you make changes to your code:

```bash
# SSH into droplet
ssh root@67.205.144.75

# Navigate to project
cd /root/responsiveworks-new

# Pull latest changes (if using Git)
git pull origin master

# Install any new dependencies
npm install

# Rebuild the app
npm run build

# Restart with PM2
pm2 restart responsiveworks

# View logs to ensure it started correctly
pm2 logs responsiveworks
```

---

## Troubleshooting

### Website Not Loading

**Check if Next.js is running:**
```bash
pm2 status
# Should show "responsiveworks" with status "online"
```

**Check PM2 logs:**
```bash
pm2 logs responsiveworks
# Look for errors
```

**Check Nginx status:**
```bash
systemctl status nginx
# Should show "active (running)"
```

**Check Nginx error logs:**
```bash
tail -f /var/log/nginx/error.log
```

**Check if port 3000 is in use:**
```bash
netstat -tulpn | grep 3000
# Should show Node.js process listening on port 3000
```

### DNS Not Resolving

- DNS changes can take 5-30 minutes to propagate globally
- Verify Cloudflare DNS records are correct
- Ensure Cloudflare proxy is enabled (orange cloud, not gray)
- Clear browser cache or test in incognito/private mode
- Try flushing DNS cache on your computer:
  - Windows: `ipconfig /flushdns`
  - Mac: `sudo dscacheutil -flushcache`
  - Linux: `sudo systemd-resolve --flush-caches`

### 502 Bad Gateway Error

This means Nginx can't connect to your Next.js app:

```bash
# Check if app is running
pm2 status

# Check app logs for errors
pm2 logs responsiveworks

# Restart the app
pm2 restart responsiveworks

# Check if port 3000 is open
netstat -tulpn | grep 3000
```

### Port 3000 Already in Use

```bash
# Find what's using port 3000
netstat -tulpn | grep 3000

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or stop PM2 process
pm2 stop responsiveworks
pm2 start responsiveworks
```

### SSL Certificate Issues

```bash
# Check certificate status
certbot certificates

# Renew certificates manually
certbot renew

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

---

## Performance Optimization Tips

1. **Enable Gzip compression in Nginx** (add to nginx.conf):
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   ```

2. **Use Cloudflare's caching and optimization features**:
   - Enable Auto Minify (JS, CSS, HTML)
   - Enable Brotli compression
   - Set up Page Rules for caching

3. **Monitor resource usage**:
   ```bash
   htop            # Interactive process viewer
   df -h           # Disk space usage
   free -m         # Memory usage
   ```

4. **Set up log rotation** to prevent disk space issues:
   ```bash
   pm2 install pm2-logrotate
   pm2 set pm2-logrotate:max_size 10M
   pm2 set pm2-logrotate:retain 7
   ```

---

## Backup Strategy

### Manual Backup
```bash
# Backup your project
cd /root
tar -czf responsiveworks-backup-$(date +%Y%m%d).tar.gz responsiveworks-new/

# Download to local machine
scp root@67.205.144.75:/root/responsiveworks-backup-*.tar.gz .
```

### Automated Backups
Enable DigitalOcean's automated backup feature:
1. Go to your droplet in the DigitalOcean dashboard
2. Click "Backups" tab
3. Enable weekly automated backups ($1.20/month for basic droplet)

---

## Security Best Practices

1. **Disable root login** and create a sudo user
2. **Change default SSH port** from 22 to something else
3. **Use SSH keys** instead of passwords
4. **Keep system updated**:
   ```bash
   apt update && apt upgrade -y
   ```
5. **Install fail2ban** to prevent brute force attacks:
   ```bash
   apt install fail2ban -y
   systemctl enable fail2ban
   ```

---

## Additional Resources

- DigitalOcean Docs: https://docs.digitalocean.com/
- Next.js Deployment: https://nextjs.org/docs/deployment
- PM2 Documentation: https://pm2.keymetrics.io/
- Nginx Documentation: https://nginx.org/en/docs/
- Cloudflare Docs: https://developers.cloudflare.com/
