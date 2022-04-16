// eslint-disable-next-line import/no-import-module-exports
import 'dotenv/config';

module.exports = {
  development: {
    use_env_variable: 'DB_URL_DEV',
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    dialect: 'postgres',
    dialectOptions: {},
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
    logging: false
  },
  test: {
    use_env_variable: 'DB_URL_TEST',
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false
  },
  production: {
    use_env_variable: 'DB_URL_PROD',
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT_PROD,
    seederStorage: 'sequelize',
    dialect: 'postgres',
    seederStorageTableName: 'sequelize_data',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false
  },
};
