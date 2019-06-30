module.exports = {
  apps: [
    {
      name: 'cash-control',
      script: 'src/index.js',
      instances: 0,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
