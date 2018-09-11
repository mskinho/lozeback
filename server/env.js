const fs = require('fs');

if (fs.existsSync('./public')) {
  process.env.NODE_ENV = 'production';
  process.env.databaseUri = 'mongodb://patel:patel@ds153752.mlab.com:53752/angular-2-app'; // Databse URI and database name
  process.env.databaseName = 'production database: angular-2-app'; // Database name
} else {
  process.env.NODE_ENV = 'development';
  process.env.databaseUri = 'mongodb://localhost:27017/loze'; // Databse URI and database name
  process.env.databaseName = 'development database:loze'; // Database name
}
