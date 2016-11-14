const DEV = 'development'
const PRODUCTION = 'production'
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  NODE_ENV,
  STATIC_ROOT: `frontend/static`,
  PORT: process.env.PORT || 8080,
  envs: {
    DEV,
    PRODUCTION,
  }
}
