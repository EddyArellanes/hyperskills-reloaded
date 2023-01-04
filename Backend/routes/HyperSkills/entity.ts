import * as express from "express"
import { check, param, validationResult } from 'express-validator'
import Logger from '../../lib/Logger'
import Response from '../../lib/Response'
//import { jwtWall } from '../../middlewares/jwt-middleware'
import PostgresClient from '../../classes/PostgresClient'

//Define Structures
const postgres = new PostgresClient()
const router = express.Router()



/**
* GET Method to Return All Entities Existed. Keep in Mind in the future if I want to scale, need to Implement Auth and Permissions :X
* Working under PostgreSQL
* 
* @return {json} - Object with the element
* */
router.get('/' , [ param('id_skill').isNumeric().optional() ] , async(req, res) => {  
  try{    
    console.log('Request here:', req.params)
    const errors = validationResult( req)
    
    if (!errors.isEmpty()) {
      console.log("Errors", errors.array())
      new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, errors.array())
      new Response( res, 400 ,req.baseUrl, req.method, {}, 'You need to Provide a Valid Skill id' )   
      
    }
    else{
      const { id_skill } = req.query
      
      const entities = ( id_skill !== undefined) 
        ? await postgres.query(`SELECT * from getEntities($1);`, [ id_skill])
        : await postgres.query(`SELECT * from getEntities();`, [])

      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 200, entities) 
      new Response( res, 200 ,req.baseUrl, req.method, entities) 
    } 
    
    
  }catch(e){
    console.log("Error", e.message)
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})
/**
* GET Method to Get one entity by it Skill ID
* Working under PostgreSQL

* @param {id} - In the url /id of the skill to get it
* @return {json} - Object with the element
* */
router.get('/:id',  [ param('id').isNumeric()], async(req, res) => {  
  try{    
    const id = req.params.id
    const data = await postgres.query(`SELECT * from getEntitySingle($1);`, [id])
    const codeResponse = (data.length === 0) ? 204 : 200
    const entity = (data.length === 0) ? {} : data[0]
    
    new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, codeResponse, entity) 
    new Response( res, codeResponse ,req.baseUrl, req.method, entity)   
    
    
  }catch(e){

    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, "", e.message)   
  }   
    
})

/**
* POST Method to Insert one element
* Working under PostgreSQL

* @param {id_skill} - Required, Integer, Skill owner of the Entity
* @param {title} - Required, Text, Name of the Entity
* @param {description} -Text, Describe Entity
* @param {image} - Text, Ilustrative entity
* @param {goal} - Integer, If it has numeric goal put it
* @return {json} - Object with the error or element
* */
router.post('/' , [ check('id_skill').isNumeric(), check('title').isString()] , async(req, res) => {  
  try{    
    const errors = validationResult( req)
    
    if (!errors.isEmpty()) {
      console.log("Errors", errors.array())
      new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 400, errors.array())
      new Response( res, 400 ,req.baseUrl, req.method, {code: 400, message: errors.array() })   
      
    }
    else{
      const { id_skill, title, description, image, goal } = req.body
      const entities = await postgres.query(`SELECT * from insertEntity($1,$2,$3,$4,$5,$6);`, [ id_skill, title, description, image, goal, new Date()])
      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 201, entities) 
      new Response( res, 201 ,req.baseUrl, req.method, entities) 
    } 
    
  }catch(e){

    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})

/**
* PUT Method to Update one element
* Working under PostgreSQL
* @param {id} - Required, Integer, ID of the Entity
* @param {id_skill} - Required, Integer, Skill owner of the Entity
* @param {title} - Text, Name of the Entity
* @param {description} -Text, Describe Entity
* @param {image} - Text, Ilustrative entity
* @param {goal} - Integer, If it has numeric goal put it
* @return {json} - Object with the error or element
* */
router.put('/:id' , [ check('id').isNumeric(), check('id_skill').isNumeric()] , async(req, res) => {  
  try{    
    const errors = validationResult( req)
    
    if (!errors.isEmpty()) {
      console.log("Errors", errors.array())
      new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 400, errors.array())
      new Response( res, 400 ,req.baseUrl, req.method, {code: 400, message: errors.array() })   
      
    }
    else{
      const id = req.params.id
      const { id_skill, title, description, image, goal, completed } = req.body
      const entities = await postgres.query(`SELECT * from updateEntity($1,$2,$3,$4,$5,$6,$7);`, [ id, id_skill, title, description, image, goal, completed])
      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 201, entities) 
      new Response( res, 201 ,req.baseUrl, req.method, entities) 
    } 
    
  }catch(e){
    console.log("Error", e.message)
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})

/**
* DELETE Method to Update one element
* Working under PostgreSQL
* @param {id} - Required, Integer, ID of the Entity
* @return {json} - Object with the error or element
* */
router.delete('/:id' , [ param('id').isNumeric()] , async(req, res) => {  
  try{    
    const errors = validationResult( req)
    
    if (!errors.isEmpty()) {
      
      new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 400, errors.array())
      new Response( res, 400 ,req.baseUrl, req.method, {code: 400, message: errors.array() })   
      
    }
    else{
      const id = req.params.id
      const deleted = await postgres.query(`SELECT * from deleteEntity($1);`, [ id])
      const codeResponse = (deleted[0].deleteentity === null) ? 204 : 200
      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, codeResponse, {}) 
      new Response( res, codeResponse ,req.baseUrl, req.method, {}) 
    } 
    
  }catch(e){

    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})

module.exports = router