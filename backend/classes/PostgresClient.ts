import { Pool } from 'pg'

export default class PostgresClient{
  user: string
  host: string
  database: string
  password: string
  port: string
  idleTimeoutMillis: number
  connectionTimeoutMillis: number
  max: number
  pool: Pool //Connection
  client: Pool //Instance of the pool
  result: any

  constructor(){
    this.user = process.env.POSTGRESQL_USER,
    this.host = process.env.POSTGRESQL_HOST,
    this.database = process.env.POSTGRESQL_DATABASE,
    this.password = process.env.POSTGRESQL_PASSWORD,
    this.port = process.env.POSTGRESQL_PORT,
    this.idleTimeoutMillis = 500,
    this.connectionTimeoutMillis = 31000,
    this.max = 20
  }
  async query( query:string, parameters:Array<any>){
    try{
      this.client = await this.createPool(); 
      this.result = await this.client.query( query, parameters)
      this.client.end()
      this.pool = null
      return this.result.rows
    } catch(err){
      console.error('query',err);
      throw new Error(err);
    }
  
  }
  async createPool(){
  
    if ( this.pool == null) {
    
      this.pool = new Pool({
       user: process.env.POSTGRESQL_USER,
       host: process.env.POSTGRESQL_HOST,
       database: process.env.POSTGRESQL_DATABASE,
       password: process.env.POSTGRESQL_PASSWORD,
       port: process.env.POSTGRESQL_PORT,
       idleTimeoutMillis: 500,
       connectionTimeoutMillis: 31000,
       max: 20
     })
 
     this.pool.on('connect', async() => {
       console.log('PostgreSQL Connected');
     })
     
 
    }

    return this.pool
  }

  generateParams( array ){
    //Return the Format to populate a Postgres Function depending number of arguments
    return array.map( (d, index) => `$${ index +1}` )
  }
}
