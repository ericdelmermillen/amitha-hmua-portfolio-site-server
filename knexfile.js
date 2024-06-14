require('dotenv').config();

module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: "utf8",
    // ssl: {
    //   rejectUnauthorized: true, // Set to false if you're testing locally and need to bypass SSL verification
    //   ca: process.env.DB_CA,     // Optional: Path to the SSL certificate authority file
    //   key: process.env.DB_KEY,   // Optional: Path to the client key file
    //   cert: process.env.DB_CERT  // Optional: Path to the client certificate file
    // }
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};


// --- above works ---




// require('dotenv').config();

// module.exports = {
//   development: {
//     client: 'mysql2',
//     connection: {
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './migrations'
//     },
//     seeds: {
//       directory: './seeds'
//     }
//   },
//   production: {
//     client: 'mysql2',
//     connection: {
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './migrations'
//     },
//     seeds: {
//       directory: './seeds'
//     }
//   }
// };

// --- above also works


// require('dotenv').config();

// module.exports = {
//   development: {
//     client: 'mysql2',
//     connection: {
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './migrations'
//     },
//     seeds: {
//       directory: './seeds'
//     }
//   },
//   production: {
//     client: 'mysql2',
//     connection: {
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './migrations'
//     },
//     seeds: {
//       directory: './seeds'
//     }
//   }
// };
