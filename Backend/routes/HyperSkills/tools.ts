import * as express from "express"
import Logger from '../../lib/Logger'
import Response from '../../lib/Response'
import * as sharp from "sharp";
import axios from "axios";
import { rejects } from "assert";

//Define Structures
const router = express.Router()
/**
* GET Method to Return Database .dump file
* Working under PostgreSQL

* @return {json } - Object with the element
* */
router.post('/' , async( req, res) => {   
  try{      

      const { width, height, file} = req.body; 
      const output = await processImage(file, {width, height, toBase64: false});
      console.log('Output', output);
      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 200, {}) 
      new Response( res, 200 ,req.baseUrl, req.method, output)
    
  }catch(e){
    console.log("Error Tools", e);
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }      
    
})

const processImage = async ( file, options) =>{
  return new Promise( async (resolve, reject) =>{
    const toBase64 = options.toBase64 || null;
    const input = (await axios({ url: "https://img2.freepng.es/20190522/pyz/kisspng-giant-panda-red-panda-bear-portable-network-graphi-5ce5740d013e54.7596772215585413250051.jpg", responseType: "arraybuffer" })).data as Buffer;
    //const output = await sharp(input).composite({ input: composite }).png().toBuffer();
    sharp(input)
        .resize(options.width, options.height)
        //.toFile(`${__dirname}/Hello.png`)
        .toBuffer()
        .then( async (buffer, err) =>{
          if (err) throw Error(err);
          // console.log('Image Processed', buffer);
          if(toBase64) buffer = Buffer.from(buffer).toString('base64');
          resolve(buffer);
        })
        .catch( error =>{
          console.log("Error :C")
          console.log(JSON.stringify(error));
          reject(error);
        })
  })
};


module.exports = router