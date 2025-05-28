module.exports.apps = [
  {
    name: 'milim-server',
    script: './dist/main.js',
    env_production: {
      NODE_ENV: 'production',
    },
  },
];
