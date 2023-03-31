module.exports = {
  port: process.env.PORT || 8000,
  db: {
    prod: process.env.DATABASE_URL || 'mongodb://127.0.0.1/coin7',
    test: 'mongodb://127.0.0.1/coin7',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '7d'
  }
};
