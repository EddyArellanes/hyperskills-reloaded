/**
 * Logger is a Library which uses Winston library to generate a log file easily
 * 
 * 
 */

import * as winston from "winston";

export default class Logger{
  type:string
  required: boolean
  

  constructor(type: string, required: boolean){
    this.type = type   
    this.required = required   
  }

}
