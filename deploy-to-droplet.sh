#!/bin/bash
set -e  # Exit on any error

echo "=========================================="
echo "ResponsiveWorks Deployment Script"
echo "=========================================="
echo ""

# Step 1: Install Node.js
echo "Step 1: Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node --version
npm --version
echo "✓ Node.js installed"
echo ""

# Step 2: Install Git
echo "Step 2: Installing Git..."
apt-get install -y git
echo "✓ Git installed"
echo ""

# Step 3: Clone repository
echo "Step 3: Cloning repository..."
cd /root
if [ -d "responsiveworks-new" ]; then
    echo "Directory exists, pulling latest changes..."
    cd responsiveworks-new
    git pull origin master
else
    git clone https://github.com/responsiveworks/www-responsiveworks-com.git responsiveworks-new
    cd responsiveworks-new
fi
echo "✓ Repository cloned"
echo ""

# Step 4: Install dependencies and build
echo "Step 4: Installing dependencies and building..."
npm install
npm run build
echo "✓ Build complete"
echo ""

# Step 5: Install and configure Nginx
echo "Step 5: Setting up Nginx..."
apt-get update
apt-get install -y nginx

# Create Nginx config
cat > /etc/nginx/sites-available/responsiveworks << 'EOF'
server {
    listen 80;
    listen [::]:80;

    server_name responsiveworks.com www.responsiveworks.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    client_max_body_size 10M;
    proxy_buffer_size 128k;
    proxy_buffers 4 256k;
    proxy_busy_buffers_size 256k;
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/responsiveworks /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx
systemctl enable nginx
echo "✓ Nginx configured and running"
echo ""

# Step 6: Install PM2 and start app
echo "Step 6: Setting up PM2..."
npm install -g pm2

# Create PM2 ecosystem file
cat > /root/responsiveworks-new/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'responsiveworks',
      script: 'npm',
      args: 'start',
      cwd: '/root/responsiveworks-new',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
EOF

cd /root/responsiveworks-new

# Stop existing PM2 process if running
pm2 stop responsiveworks 2>/dev/null || true
pm2 delete responsiveworks 2>/dev/null || true

# Start the app
pm2 start ecosystem.config.js
pm2 save
pm2 startup | tail -1 | bash
echo "✓ PM2 configured and app started"
echo ""

# Step 7: Configure firewall
echo "Step 7: Configuring firewall..."
ufw --force enable
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
echo "✓ Firewall configured"
echo ""

# Step 8: Check status
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo ""
echo "Checking status..."
echo ""
echo "PM2 Status:"
pm2 status
echo ""
echo "Nginx Status:"
systemctl status nginx --no-pager
echo ""
echo "Testing local connection..."
curl -I http://localhost:3000 2>&1 | head -5 || echo "Waiting for app to start..."
echo ""
echo "=========================================="
echo "Your website should now be live at:"
echo "  - https://responsiveworks.com"
echo "  - https://www.responsiveworks.com"
echo "=========================================="
echo ""
echo "Useful commands:"
echo "  pm2 logs responsiveworks  - View application logs"
echo "  pm2 restart responsiveworks - Restart the app"
echo "  pm2 status - Check PM2 status"
echo "  nginx -t - Test nginx config"
echo "  systemctl status nginx - Check nginx status"
