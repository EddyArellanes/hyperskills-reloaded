/**
 * Logger is a Library which uses Winston library to generate a log file easily
 * 
 * 
 */

import * as winston from "winston";

export default class Logger{
  level:string  //error || info
  message: string
  register: any

  constructor(level: string){
    this.level = level    
    this.register =  winston.createLogger({
      level: this.level,
      format: winston.format.json(),
      transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` .
        // - Write all logs error (and below) to `error.log`.
        // 
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/info.log', level: 'info'})
      ]
    })
  }

  createReport(endpoint:String, status:number, message:any){
    this.message = message || "No data to print"
    this.register.info({endpoint, status, message, created_at: new Date()})
  }
  createError(endpoint:String, status:number, message:any){
    this.message = message || "Unknown error"
    this.register.error({endpoint, status, message, created_at: new Date()})
  }
}
