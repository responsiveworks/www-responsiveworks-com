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
