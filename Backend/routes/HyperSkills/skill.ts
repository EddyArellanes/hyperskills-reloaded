import * as express from "express"
import { check, param, validationResult } from 'express-validator'
import Logger from '../../lib/Logger'
import Response from '../../lib/Response'
import { jwtWall } from '../../middlewares/jwt-middleware'
import PostgresClient from '../../classes/PostgresClient'

//Define Structures
const postgres = new PostgresClient()
const router = express.Router()
/**
* GET Method to Return All Skill Existed. Keep in Mind in the future if I want to scale, need to Implement Auth and Permissions :X
* Working under PostgreSQL

* @return {json } - Object with the element
* */
router.get('/' , async(req, res) => {  
  try{    
    console.log('REQ', req.param)
    const data = await postgres.query(`SELECT * from getSkills();`, [])
    const skills = data
    new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 200, skills) 
    new Response( res, 200 ,req.baseUrl, req.method, skills)   
    
    
  }catch(e){
    console.error("Error", e.message)
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})
/**
* GET Method to Get one element by it ID
* Working under PostgreSQL

* @param {id} - In the url /id of the user to edit
* @return {json} - Object with the element
* */
router.get('/:id' , [ param('id').isNumeric()], async(req, res) => {  
  try{    
    const id = req.params.id
    const data = await postgres.query(`SELECT * from getSkillSingle($1)`, [id])
    const codeResponse = (data.length === 0) ? 204 : 200
    const skill = (data.length === 0) ? {} : data[0]
    
    new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, codeResponse, skill) 
    new Response( res, codeResponse ,req.baseUrl, req.method, skill)
    
  }catch(e){

    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, "", e.message)   
  }   
    
})

/**
* POST Method to Insert one element
* Working under PostgreSQL

* @param {title} - Required, Text, Name of the Skill
* @param {description} -Text, Describe Skill
* @param {countable} - Boolean: If the Skill is numeric goal Example: 000/400
* @param {goal} - Number: If countable is true set the goal, Example: 400, 
* @param {entity_equipped} - Number: ID of Entity that want to be completed
* @param {color} - String: Color that represents the Skill, can be Hex or Material Design named, Example: blue darken-2
* @return {json} - Object with the error or element
* */
router.post('/' , [ check('title').isString()] , async(req, res) => {  
  try{    
    const errors = validationResult( req)
    
    if (!errors.isEmpty()) {
      console.log("Errors", errors.array())
      new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 400, errors.array())
      new Response( res, 400 ,req.baseUrl, req.method, {code: 400, message: errors.array() })   
      
    }
    else{
      const { title, description, countable, goal, entity_equipped, color } = req.body
      const skill = await postgres.query(`SELECT * from insertSkill($1,$2,$3,$4,$5,$6, $7);`, [ title, description, countable, goal, entity_equipped, color , new Date()])
      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 201, skill) 
      new Response( res, 201 ,req.baseUrl, req.method, skill) 
    } 
    
  }catch(e){

    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})


/**
* PUT Method to Update one element
* Working under PostgreSQL
* @param {id} - Required, Integer, ID of the Skill
* @param {title} - Text, Name of the Entity
* @param {description} - Text, Describe Entity
* @param {countable} -Boolean, show if the Skill is numeric oriented
* @param {goal} - Integer, If countable si true, this can't be 0
* @param {entity_equipped} - Integer, Id of the Entity in progress to be finished
* @param {color} - Text, color to identify the Skill, color name or Hex
* @return {json} - Object with the status of the request
* */
router.put('/:id' , [ param('id').isNumeric() ] , async(req, res) => {  
  try{    
    const errors = validationResult( req)
    
    if (!errors.isEmpty()) {
      
      new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 400, errors.array())
      new Response( res, 400 ,req.baseUrl, req.method, {code: 400, message: errors.array() })   
      
    }
    else{
      
      const id = req.params.id
      let { title, description, countable, goal, entity_equipped, color } = req.body
      if( !entity_equipped) entity_equipped = 0
      
      const entities = await postgres.query(`SELECT * from updateSkill($1,$2,$3,$4,$5,$6,$7);`, [ id, title, description, countable, goal, entity_equipped, color])
      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 201, entities) 
      new Response( res, 201 ,req.baseUrl, req.method, entities) 
    } 
    
  }catch(e){
    console.log("Error", e)
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})

module.exports = router