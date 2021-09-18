module.exports = {
    apps : [{
      name: 'bot_ships',
      script: './dist/app.js',
      instances: 1,
      autorestart: true,
      watch: true,
          ignore_watch: ["node_modules"]
    }]
  };
  