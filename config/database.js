module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env(
          "DATABASE_HOST",
          "bymuv6mugzbi9p8k7hs9-postgresql.services.clever-cloud.com"
        ),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "bymuv6mugzbi9p8k7hs9"),
        username: env("DATABASE_USERNAME", "u5if85fvffef35ctf5me"),
        password: env("DATABASE_PASSWORD" /* Password moved in .env file */),
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {
        pool: {
          max: 5,
        },
      },
    },
  },
});
