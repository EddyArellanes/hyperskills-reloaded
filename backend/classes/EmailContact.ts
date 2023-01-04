import { check, validationResult  } from 'express-validator'
class EmailContact{
  firstname: string //Name of the User: Ej. Eddy
  lastname: string  //LastName of the User: Ej. Arellanes
  phone: string     //Phone of the User: Ej. +525588991122
  email: string     //Email of the User: Ej. eddy@gmail.com
  createdAt: Date   //Date of the Creation
  channel: string   //Channel of the user origin: Ej. Web, Facebook, Whatsapp  

  constructor(firstname: string ,lastname: string, phone: string, email: string, channel: string){
    this.firstname = firstname
    this.lastname = lastname
    this.phone = phone
    this.email = email
    this.channel = channel
    this.createdAt = new Date()
  }

  //Pending stuff
  sanitize(){          
  }
  saveEmail(){
    
  }
  sendEmail(){

  }
}