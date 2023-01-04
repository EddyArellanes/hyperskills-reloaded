/**
 * Mailer is a Library which uses node-mailer library to send mails easily
 * 
 * 
 */

import * as nodeMailer from 'nodemailer'
import EmailsAttributes from '../classes/EmailAttributes'

export default class Mailer{
  name: EmailsAttributes = new EmailsAttributes('String', true)
  email: EmailsAttributes = new EmailsAttributes('Email', true)
  phone: EmailsAttributes = new EmailsAttributes('Number', false)
  message: EmailsAttributes = new EmailsAttributes('String', false)

  validate = ( emailPackage: any, schema) => {
    
    const emailsForms: any = { name: this.name, email: this.email, phone: this.phone, message: this.message}

    //Step 1: To know If elements are the same defined on Schema
    const schemaModel = Object.keys( emailsForms[schema]).sort()
    const packageReceived = Object.keys( emailPackage).sort()    

    if(JSON.stringify(schemaModel) !== JSON.stringify( packageReceived)) return false    

    //Step 2: Review every field {Required, Email, Phone}

    for (let [key, value] of Object.entries( emailsForms[schema])) {
      //Key [0-4] Value {name.type, name.required...}
      /*
      console.log("Key:")
      console.log(key)
      console.log(value)
      console.log("First Iteration")
      console.log("Name JSON")
      console.log(emailPackage[key])
       */   
  
    }
    //Step 3: That's it
  
    const { name, email, phone, message } = emailPackage
    return (name && email && phone && message) ? true : false
  }
  /**  NOT WORKING, Save the mail into DB, specify DB need to be defined, also Folder Models with Schema :P
  * @param {none} 
  * 
  * @return {json} {}
  */
  saveMail = ( emailPackage) => {
    try{    
      return new Promise( (resolve, reject) => {    
        resolve("Hello")       
      })
    
    }catch (error){
      return {err: 'Something was wrong in  saveMail()', details: error.message}
    }

  }
  async sendMail(userInfo, emails, emailPackage){
    try{
    
      const { name, email, phone, message } = emailPackage

      return new Promise( (resolve, reject) =>{
        
        const transport = nodeMailer.createTransport({
          service: 'gmail',
          auth: {
            user: userInfo.email,
            pass: userInfo.password
          }
        })

        transport.sendMail({
          from:  userInfo.email,
          to: emails,
          subject: 'Nuevo mensaje de contacto',
          html: `
          <h2>El usuario <strong>${name} </strong> ha solicitado información a través de la página web</h2>
          <ul>
            <li>
              Nombre - ${name || ""}
            </li>
            <li>
              Correo - ${email || ""}
            </li>
            <li>
              Teléfono - ${phone || ""}
            </li>
            <li>
              Mensaje - ${message || ""}
            </li>        
          </ul>
          ` 
        }, (err, info) => {   
        
          if (err) {
            console.log(err)
            reject({message: 'Something was wrong while sending message ', details: err})

          } else {
            resolve({msg: '¡Email sending!' , info})
          }
        
        })
      })
    }catch(error){
      return { err: 'Something was wrong in sendMail() ', details: error.message}
    }
  }

}
