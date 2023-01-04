import * as express from "express"
import { check, param, validationResult } from 'express-validator'
import Logger from '../../lib/Logger'
import Response from '../../lib/Response'
import { basicAuthWall } from '../../middlewares/basic-authentication'

//Define Structures
const router = express.Router()
/**
* GET Method to Return Database .dump file
* Working under PostgreSQL

* @return {json } - Object with the element
* */
router.get('/db' , async( req, res) => {   
  try{      
            
      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 200, {}) 
      res.sendFile(__dirname + '/hyperskills.dump');
      //Delete dump after this SOON
    
  }catch(e){

    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }      
    
})

module.exports = router