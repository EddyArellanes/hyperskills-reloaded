import { Pool } from 'pg'

let  pool:any;

export function getPool():Pool {
  if (pool == null) {
     pool = new Pool({
      user: process.env.POSTGRESQL_USER,
      host: process.env.POSTGRESQL_HOST,
      database: process.env.POSTGRESQL_DATABASE,
      password: process.env.POSTGRESQL_PASSWORD,
      port: process.env.POSTGRESQL_PORT,
      idleTimeoutMillis: 500,
      connectionTimeoutMillis: 31000,
      max: 20
    });

    pool.on('connect', async() => {
      //console.log('connected to the db');
    });
    

  }
   return pool;
}



