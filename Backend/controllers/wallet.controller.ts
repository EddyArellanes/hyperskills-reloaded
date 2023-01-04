import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Wallet } from "../entities/Wallet";
import SequelizeGenerate from '../lib/SequelizeGenerate';
// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');


export const getWallets = async (
  req: Request,
  res: Response
): Response => {
  console.log('Credentials', process.env.DB_HOST);
  const seque = new SequelizeGenerate();
  const schemas:Array<string> = await seque.schemas();
  const result:Array<string> = [];

  for await(const schema of schemas){
    const element =  await seque.generate(schema);
    result.push(element);
  }
  /*const generateModels = schemas.map( async  (schema) => {
    console.log("Schema Target", schema);
    return await seque.generate(schema)
  })
  const result = await Promise.all(generateModels);
  ]*/
  return res.json(result);

  
  //const result = await new Jira(10040,'PIJ').getProject();
  //console.log('Results', result);
  //return res.json(result);
};

export const getWallet = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const results = await getRepository(Wallet).findOne(req.params.id);
  return res.json(results);
};

export const createWallet = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newWallet = await getRepository(Wallet).create(req.body);
  const results = await getRepository(Wallet).save(newWallet);
  console.log('Results', results);
  return res.json(results);
};

export const updateWallet = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const currentWallet = await getRepository(Wallet).findOne(req.params.id);
  if (currentWallet) {
    getRepository(Wallet).merge(currentWallet, req.body);
    const results = await getRepository(Wallet).save(currentWallet);
    return res.json(results);
  }

  return res.json({msg: 'Not Wallet found'});
};

export const deleteWallet = async (req: Request, res: Response): Promise<Response> => {
  const results = await getRepository(Wallet).delete(req.params.id);
  return res.json(results);
};