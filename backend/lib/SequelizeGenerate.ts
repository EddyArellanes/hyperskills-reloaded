import { IConfig, ModelBuilder, DialectPostgres } from 'sequelize-typescript-generator';
import { Sequelize, QueryInterface } from 'sequelize';

export default class SequelizeGenerator{
  username:string = process.env.DB_USERNAME
  password:string = process.env.DB_PASSWORD
  database:string = process.env.DB_DATABASE
  host:string = process.env.DB_HOST
  config:IConfig

  constructor( associationFile?:string){
    const pathAssociation = associationFile || '';
    this.config = {
      connection: {
          dialect: 'postgres',
          database: this.database,
          username: this.username,
          password: this.password,
          host: this.host,
          logging: false
      },
      metadata: {
          indices: true,
          case: 'CAMEL',
      },
      output: {
          clean: true,
          outDir: 'entities'
      }
    };
    if(pathAssociation !== '') this.config.metadata.associationsFile = pathAssociation;
  }
  async schemas(): Promise<any>{
    console.log('Credentials', this.config);
    const seq = new Sequelize(this.config.connection);
    const data:any = await seq.getQueryInterface().showAllSchemas();
    console.log('Schemas', data);
    return data;
  }
  async generate(schema:string){
   this.config.metadata.schema = schema;
   this.config.output.outDir = this.config.output.outDir + '/' + schema;
    console.log('Credentials', this.config);

    const dialect = new DialectPostgres();
    const builder = new ModelBuilder(this.config, dialect );
    try {
      console.log('Start with Build');
      await builder.build();
      return "Done";
    }
    catch(err) {
        console.error(err);
        process.exit(1);
    }    
  }
}
