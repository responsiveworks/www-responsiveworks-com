# Deployment Guide for Digital Ocean

This guide covers two methods to deploy your Next.js website on Digital Ocean:
1. **App Platform** (Recommended - Easiest)
2. **Droplet with Docker** (More control)

---

## Method 1: Digital Ocean App Platform (Recommended)

App Platform is the easiest way to deploy your Next.js application with automatic builds, deployments, and SSL certificates.

### Prerequisites
- Digital Ocean account
- GitHub/GitLab repository with your code
- Domain name (optional but recommended)

### Steps

#### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Add Digital Ocean deployment configuration"
git push origin master
```

#### 2. Create App on Digital Ocean

**Option A: Using the Web Interface**
1. Log in to [Digital Ocean](https://cloud.digitalocean.com/)
2. Click "Create" > "Apps"
3. Connect your GitHub repository
4. Select your repository and the `master` branch
5. Digital Ocean will auto-detect Next.js and configure build settings
6. Review the configuration:
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - HTTP Port: `3000`
7. Choose your plan (Basic - $5/month is sufficient for most sites)
8. Click "Next" and then "Create Resources"

**Option B: Using the CLI with App Spec**
```bash
# Install doctl (Digital Ocean CLI)
# See: https://docs.digitalocean.com/reference/doctl/how-to/install/

# Authenticate
doctl auth init

# Update .do/app.yaml with your GitHub repo details
# Then create the app
doctl apps create --spec .do/app.yaml
```

#### 3. Configure Custom Domain (Optional)
1. In your app dashboard, go to "Settings" > "Domains"
2. Add your custom domain
3. Update your domain's DNS records as instructed
4. Digital Ocean will automatically provision an SSL certificate

#### 4. Environment Variables (If Needed)
If you need environment variables:
1. Go to "Settings" > "App-Level Environment Variables"
2. Add your variables (API keys, database URLs, etc.)
3. App will automatically redeploy

### Monitoring and Logs
- View logs: App dashboard > "Runtime Logs"
- View build logs: App dashboard > "Build Logs"
- Monitor performance: App dashboard > "Insights"

---

## Method 2: Digital Ocean Droplet with Docker

This method gives you more control but requires more setup and maintenance.

### Prerequisites
- Digital Ocean account
- Domain name (optional)
- Basic knowledge of Linux and Docker

### Steps

#### 1. Create a Droplet
1. Log in to [Digital Ocean](https://cloud.digitalocean.com/)
2. Click "Create" > "Droplets"
3. Choose:
   - Image: Ubuntu 22.04 LTS
   - Plan: Basic ($6/month is sufficient)
   - Add SSH key for authentication
4. Click "Create Droplet"

#### 2. Connect to Your Droplet
```bash
ssh root@YOUR_DROPLET_IP
```

#### 3. Install Docker and Docker Compose
```bash
# Update packages
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y

# Verify installation
docker --version
docker-compose --version
```

#### 4. Clone Your Repository
```bash
# Install Git if needed
apt install git -y

# Clone your repo
cd /var/www
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git responsiveworks
cd responsiveworks
```

#### 5. Build and Run Docker Container
```bash
# Build the Docker image
docker build -t responsiveworks-website .

# Run the container
docker run -d \
  --name responsiveworks \
  --restart unless-stopped \
  -p 3000:3000 \
  responsiveworks-website
```

#### 6. Set Up Nginx as Reverse Proxy (Optional but Recommended)
```bash
# Install Nginx
apt install nginx -y

# Create Nginx configuration
cat > /etc/nginx/sites-available/responsiveworks << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable the site
ln -s /etc/nginx/sites-available/responsiveworks /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx
```

#### 7. Set Up SSL with Let's Encrypt (Recommended)
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Certbot will automatically configure Nginx for HTTPS
```

#### 8. Set Up Automatic Updates (Optional)
```bash
# Create update script
cat > /root/update-website.sh << 'EOF'
#!/bin/bash
cd /var/www/responsiveworks
git pull origin master
docker stop responsiveworks
docker rm responsiveworks
docker build -t responsiveworks-website .
docker run -d \
  --name responsiveworks \
  --restart unless-stopped \
  -p 3000:3000 \
  responsiveworks-website
EOF

chmod +x /root/update-website.sh

# Run manually when you want to update:
# /root/update-website.sh
```

### Monitoring Docker Container
```bash
# View logs
docker logs responsiveworks

# Follow logs in real-time
docker logs -f responsiveworks

# Check container status
docker ps

# Restart container
docker restart responsiveworks
```

---

## Cost Estimates

### App Platform
- **Basic Plan**: $5/month
- Includes: 512 MB RAM, automatic scaling, SSL, automatic deployments
- Best for: Small to medium traffic sites

### Droplet with Docker
- **Basic Droplet**: $6/month (1 GB RAM, 25 GB SSD)
- **Regular Droplet**: $12/month (2 GB RAM, 50 GB SSD)
- Best for: Custom configurations, multiple apps

---

## Recommended Setup

For most users, **Digital Ocean App Platform** is recommended because:
- Automatic deployments from GitHub
- Automatic SSL certificates
- Built-in monitoring and logs
- No server maintenance required
- Automatic scaling
- Easy rollbacks

Use **Droplet with Docker** if you need:
- Multiple applications on one server
- Custom server configurations
- Root access for specific tools
- Lower costs for multiple apps

---

## Troubleshooting

### App Platform Issues
- **Build fails**: Check build logs in the dashboard
- **App crashes**: Check runtime logs for errors
- **Slow performance**: Upgrade to a higher plan

### Docker/Droplet Issues
- **Container won't start**: Check logs with `docker logs responsiveworks`
- **Port already in use**: Stop conflicting services or change ports
- **Out of memory**: Upgrade droplet or optimize application

### General Issues
- **502 Bad Gateway**: Application not running or wrong port
- **Connection refused**: Check firewall settings
- **Slow loading**: Enable caching, optimize images, use CDN

---

## Next Steps

After deployment:
1. Set up monitoring (Digital Ocean Monitoring is free)
2. Configure backups if using Droplet
3. Set up CI/CD for automatic deployments
4. Add custom domain and SSL
5. Configure environment variables for production
6. Set up error tracking (Sentry, etc.)

---

## Support

- Digital Ocean Docs: https://docs.digitalocean.com/
- Digital Ocean Community: https://www.digitalocean.com/community/
- Next.js Deployment Docs: https://nextjs.org/docs/deployment
