import SequelizeGenerate from './SequelizeGenerate';
import * as dotenv from 'dotenv';
dotenv.config();

const build = async () => {
  const seque = new SequelizeGenerate();
  const schemas:Array<string> = await seque.schemas();
  if(schemas.length == 0) schemas.push('public');
  const generateModels = schemas.map( async  (schema) => {
    console.log("Schema Target", schema);
    const sequelizer = new SequelizeGenerate()
    return await sequelizer.generate(schema)
  })
  
  await Promise.all(generateModels);
  
  console.log('All Schema Models has been imported');
  
};

const start = async () => {
  await build();
};

start();