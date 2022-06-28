/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
var Url = require('url-parse');

const DATABASE_URL = new Url(Env.get('CLEARDB_DATABASE_URL'));

console.log(DATABASE_URL);

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | SQLite
    |--------------------------------------------------------------------------
    |
    | Configuration for the SQLite database.  Make sure to install the driver
    | from npm when using this connection
    |
    | npm i sqlite3
    |
    */
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: Application.tmpPath('db.sqlite3'),
      },
      pool: {
        afterCreate: (conn, cb) => {
          conn.run('PRAGMA foreign_keys=true', cb)
        }
      },
      migrations: {
        naturalSort: true,
      },
      useNullAsDefault: true,
      healthCheck: false,
      debug: false,
    },
    mysql: {
      client: 'mysql',
      connection: {
        host: DATABASE_URL.host as string,
        port: Number(''),
        user: DATABASE_URL.username as string,
        password: DATABASE_URL.password as string,
        database: DATABASE_URL.pathname.substr(1) as string
      },
      healthCheck: false,
    },

    mysqlocal: {
      client: 'mysql',
      connection: {
        host: Env.get('DB_HOST', 'localhost'),
        port: Env.get('DB_PORT', '3306'),
        user: Env.get('DB_USER', 'vanotis720'),
        password: Env.get('DB_PASSWORD', '1234'),
        database: Env.get('DB_DATABASE', 'vanotis720_develeve'),
      }
    },

  }
}

export default databaseConfig
