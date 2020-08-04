module.exports = {
  authentication: {
    getJwtSecret: () => {
      if (process.env.JWT_SECRET === '') {
        console.error('JWT_SECRET not provided via env variable. Closing server.');
        process.exit(1);
      } else {
        return process.env.JWT_SECRET;
      }
    },
    defaultTokenExpiryTimeMs: 3600000
  },
  cors: {
    whitelistedCorsDomains: ['http://localhost:8080', 'http://localhost:3000','http://142.1.46.70:8086']
  },
  rateLimiter: {
    maxRequestWindowMs: 10000,
    maxRequestsAllowedPerWindow: 200
  }
};
