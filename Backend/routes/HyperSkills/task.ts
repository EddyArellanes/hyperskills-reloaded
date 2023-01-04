import * as express from "express"
import { check, param, query, body, validationResult } from 'express-validator'
import Logger from '../../lib/Logger'
import Response from '../../lib/Response'
//import { jwtWall } from '../../middlewares/jwt-middleware'
import PostgresClient from '../../classes/PostgresClient'
import { Request } from "express-validator/src/base"

//Define Structures
const postgres = new PostgresClient()
const router = express.Router()

/**
* GET Method to Return All Tasks. Keep in Mind in the future if I want to scale, need to Implement Auth and Permissions :X
* Working under PostgreSQL
* 
* @return {json} - Object with the element
* */
router.get('/' , async(req, res) => {  
  try{    
      //Task is a Instance of a Skill, Joined with Entity if Exist
      /*{
        title: "Reading",
        description: "Read 10 pages today",
        countable: true,
        goal: 10,
        entity: {
          title
          description
          image
          goal
          completed
        }
        note,
        current,
        completed_rate,
        completed,
        current
      }*/
      const tasks = await postgres.query(`SELECT * from getTasks();`, [])

      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 200, tasks) 
      new Response( res, 200 ,req.baseUrl, req.method, tasks)
    
  }catch(e){
    console.log("Error /task:", e)
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})


/**
* GET Method to Return Tasks By Notes!, it will be a Complex Query I thought
* 
* @return {json} - Object with the element
* */
router.get('/notes' , async(req, res) => {  
  try{    
      const { query } = req
      console.log("Query", query)
      const tasks = await postgres.query(`SELECT * from getNotes($1,$2);`, [null,null])
      console.log("Tasks Size", tasks.length)
      
      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 200, tasks) 
      new Response( res, 200 ,req.baseUrl, req.method, tasks)
    
  }catch(e){
    console.log("Error /notes:", e)
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})


/**
* GET Method to Return Tasks only of this Day
* Working under PostgreSQL
* @param {date} - Required, Date of the Client
* @return {json} - Object with the element
* */
router.get('/today' ,  [ query('date').exists().withMessage('Date is missing or is invalid')] , async(req: Request, res: Response) => {  
  try{    
      const errors = validationResult( req)
      if (!errors.isEmpty()) {
        console.log("Query", req.query)
        console.log("Errors", errors.array())
        new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 400, errors.array())
        new Response( res, 400 ,req.baseUrl, req.method, {code: 400, message: errors.array() })   
        
      }
      else{
        const date = req.query.date
        const tasks = await postgres.query(`SELECT * from getTasks($1);`, [date])       
        new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 200, tasks) 
        new Response( res, 200 ,req.baseUrl, req.method, tasks)
      }

    
  }catch(e){
    console.log("Error /task:", e.message)
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})

/**
* GET Method to Return all Tasks by Skill
* Working under PostgreSQL
* @param {date} - Required, Date of the Client
* @return {json} - Object with the element
* */
router.get('/skill' ,  [ check('id_skill').isNumeric().withMessage('ID Skill must be numeric')] , async(req: Request, res: Response) => {  
  try{    
      const errors = validationResult( req)
      if (!errors.isEmpty()) {
        console.log("Query", req.query)
        console.log("Errors", errors.array())
        new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 400, errors.array())
        new Response( res, 400 ,req.baseUrl, req.method, {code: 400, message: errors.array() })   
        
      }
      else{
        //I need to create another Function to Filter By skill 
        const id_skill = req.query.id_skill       
        const tasks = await postgres.query(`SELECT * from getTasks($1,$2);`, [null, id_skill])        
        new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 200, tasks) 
        new Response( res, 200 ,req.baseUrl, req.method, tasks)
      }

    
  }catch(e){
    console.log("Error /task:", e.message)
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})

/**
* GET Method to Get one entity by it  ID
* Working under PostgreSQL

* @param {id} - In the url /id of the task
* @return {json} - Object with the element
* */
router.get('/:id',  [ param('id').isNumeric()], async(req, res) => {  
  try{    

    const id = req.params.id    
    const data = await postgres.query(`SELECT * from getTaskSingle($1);`, [id])
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
router.post('/' , [ check('id_skill').isNumeric(), check('id_entity').optional().isNumeric() ] , async(req, res) => {  
  try{    
    const errors = validationResult( req)
    
    if (!errors.isEmpty()) {
      console.log("Errors", errors.array())
      new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 400, errors.array())
      new Response( res, 400 ,req.baseUrl, req.method, {code: 400, message: errors.array() })   
      
    }
    else{
      const { id_skill, id_entity } = req.body
      const dataSQL = [ id_skill]
      if( id_entity) dataSQL.push( id_entity)

      const parametersSQL = postgres.generateParams( dataSQL)

      console.log("Data SQL", dataSQL)
      console.log("ParametersSQL", parametersSQL)

      const entities = await postgres.query(`SELECT * from insertTask(${parametersSQL});`, dataSQL)
      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 201, {}) 
      new Response( res, 201 ,req.baseUrl, req.method, entities) 
    } 
    
  }catch(e){
    console.log("Error in POST Task:", e.message)
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})

/**
* POST Method to Fill the number of Tasks asocciate with the number of Skills
* Working under PostgreSQL
* @param {date} - Required, Date of the Client
* @return {json} - Object with the new Tasks
* */
router.post('/fill'  ,  [ check('date').exists().withMessage('Date is missing or is invalid')] ,async(req, res) => {  
  try{    
    const errors = validationResult( req)
    if (!errors.isEmpty()) {
      console.log("Errors", errors.array())
      new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 400, errors.array())
      new Response( res, 400 ,req.baseUrl, req.method, {code: 400, message: errors.array() })   
      
    }else{
      const date = req.body.date
      
      //Aquí hay 3 Formas de hacer ésta shit xD Del Mejor al Peor
      //1. Que en PostgreSQL se haga todo, quiero decir el Select de todos los skills y por cada skill una nueva task
      //2. Que se obtengan los skills aquí y se arme el arreglo para hacer un Update de varios rows
      //*Actualmente en uso *3. Manual: Obtener todos los skills, armar el array y hacer un for de inserción uno a uno 
      const checkTasks = await postgres.query(`SELECT * from getTasks($1);`, [ date])
      console.log(checkTasks.length)

      if( checkTasks.length === 0){
        const data = await postgres.query(`SELECT * from getSkills();`, []);
        const skills = data;
        console.log('Skills', skills);
        const sql = skills.map( async  s => await postgres.query(`SELECT * from insertTask($1,$2);`, [s.id, s.entity_equipped]) )
        
        await Promise.all( sql)
        
        new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 201, {}) 
        new Response( res, 201 ,req.baseUrl, req.method, {})
      }
      else{
        console.log("Already Existed")
        new Response( res, 303 ,req.baseUrl, req.method, {})
      }
    }

  }catch(e){
    console.log("Error in POST Task:", e.message)
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
router.put('/:id' , [ param('id').isNumeric()] , async(req, res) => {  
  try{    
    const errors = validationResult( req)
    
    if (!errors.isEmpty()) {
      console.log("Errors", errors.array())
      new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 400, errors.array())
      new Response( res, 400 ,req.baseUrl, req.method, {code: 400, message: errors.array() })   
      
    }
    else{
      const id = req.params.id
      const { current, completed_rate, completed, note } = req.body
      const dataSQL = [ id, current, completed_rate, completed, note]
      const parametersSQL = postgres.generateParams( dataSQL)  
      
      let taskBefore =  await postgres.query(`SELECT * from getTaskSingle($1);`, [ id])   
      let taskUpdated = await postgres.query(`SELECT * from updateTask(${parametersSQL});`, dataSQL)
      taskBefore = taskBefore[0]
      taskUpdated = taskUpdated[0]

      //Here I will do A validation of Progress of the Entity, if the Entity exist of course

      if( taskUpdated.id_entity !== null){

        const entityProgress = taskUpdated.task_current - taskBefore.task_current //Calculus OK
        const progress = taskUpdated.entity_current + entityProgress
        //The Only query that is not a PG Function at the moment
        await postgres.query('UPDATE entity SET current = $1, updated_at = NOW() WHERE id = $2;', [ progress, taskUpdated.id_entity])
      }
      
      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 201, {}) 
      new Response( res, 201 ,req.baseUrl, req.method, {}) 
    } 
    
  }catch(e){
    console.log("Error", e.message)
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})

/**
* PUT Method to Update all the Entity of the Today Task if Skill Entity is updated
* Working under PostgreSQL
* @param {id_skill} - Required, Integer, ID of the Skill
* @param {id_entity} - Optional
* @return {json} - Object with the error or element
* */
router.put('/entity/equipped/:id_skill' , 
  [ param('id_skill').isNumeric(), check('id_entity'), check('_date')] , 
  async(req, res) => {  

  try{        
    const errors = validationResult( req)
    
    if (!errors.isEmpty()) {
      console.log("Errors", errors.array())
      console.log(req.body)
      new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 400, errors.array())
      new Response( res, 400 ,req.baseUrl, req.method, {code: 400, message: errors.array() })   
      
    }
    else{
      const id_skill = req.params.id_skill
      const { id_entity, _date } = req.body
      
      const result = await postgres.query('select * from updateTaskEntity($1, $2, $3)', [id_skill, id_entity, _date])
      console.log("Result", result)
      new Logger('info').createReport(`${ req.baseUrl} ${ req.method} `, 201, {}) 
      new Response( res, 201 ,req.baseUrl, req.method, {}) 
    } 
    
  }catch(e){
    console.log("Error", e.message)
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 500, e.message)
    new Response( res, 500 ,req.baseUrl, req.method, {code: 500, message: 'Service Error'} , e.message)   
  }   
    
})
module.exports = router