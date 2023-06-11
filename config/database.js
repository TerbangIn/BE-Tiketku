module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: `${process.env.DB_NAME}_production`,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: `${process.env.DB_NAME}_production`,
        host: 'localhost',
        dialect: 'postgres',
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: `${process.env.DB_NAME}_test`,
        host: 'localhost',
        dialect: 'postgres',
    },
}