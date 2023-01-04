const nodeMailer = require('nodemailer')
const emailsForms = require('../models/Emails')

const validate = ( emailPackage, schema) => {
  //console.log(emailsForms[schema])
  //console.log(emailPackage)

  //Step 1: To know If elements are the same defined on Schema
  const schemaModel = Object.keys( emailsForms[schema]).sort()
  const packageReceived = Object.keys( emailPackage).sort()

  if(JSON.stringify(schemaModel) !== JSON.stringify( packageReceived)) return false
  //Step 2: Review every field {Required, Email, Phone}
  for (let [key, value] of Object.entries( emailsForms[schema])) {
    //Key [0-4] Value {name.type, name.required...}
    
    console.log("Key:")
    console.log(key)
    console.log(value)
    console.log("First Iteration")
    console.log("Name JSON")
    console.log(emailPackage[key])    

}
  //Step 3: That's it

  const { name, email, phone, message } = emailPackage
  return (name && email && phone && message) ? true : false
}
/**  Save the mail into DB, specify DB need to be defined, also Folder Models with Schema :P
* @param {none} 
* 
* @return {json} {}
*/
const saveMail = ( emailPackage) => {
  try{    
    return new Promise( (resolve, reject) => {    
      resolve("Hello")       
    })
  
  }catch (error){
    return {err: 'Something was wrong in  saveMail()', details: err.message}
  }

}
const sendMail = async (userInfo, emails, emailPackage) => {
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
    return { err: 'Something was wrong in sendMail() ', details: err.message}
  }
}

const sendMailJob = async(userInfo, emails, emailPackage) => {
  try{    
    return new Promise( (resolve, reject) => {    
      resolve("Hello")       
    })
  
  }catch (error){
    return {err: 'Something was wrong in  saveMail()', details: err.message}
  }

}



module.exports = {
  validate,
  saveMail,
  sendMail
}