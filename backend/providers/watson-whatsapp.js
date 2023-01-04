const AssistantV2 = require('ibm-watson/assistant/v2')
const dotenv = require('dotenv')
const debug = false

dotenv.config()



const getWatsonAssistantId = () =>{
  console.log("Watson Assistant")
  console.log()
  return process.env.WATSON_ASSISTANT_ID_WHATSAPP
}
const createService = () =>{
  return new AssistantV2({
    version: '2019-07-17',
    iam_apikey: process.env.ASSISTANT_IAM_APIKEY,
    url: process.env.ASSISTANT_URL,
    disable_ssl_verification: true
  })
}
const watsonMessage = async (message) => {
  try{
    return new Promise( async (resolve, reject) =>{    
      const service = createService()
      const assistantID = getWatsonAssistantId()
      const sessionId = await createSession(service, assistantID)
      service.message({
        assistant_id: assistantID,
        session_id: sessionId,
        input: {
          'message_type': 'text',
          'text': message
          }
        })
        .then(res => {
          //saveMessageJSON(res)//Need to do Sync this shit jaja          
          const reply = formatSeparateMessages( res.output.generic)                  
          resolve(reply)
          
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }catch(error){
    console.log("Watson Send Message broke </3")
    console.log(error)
    return error  
  }
}
const createSession = ( service, assistant_id) =>{
  return new Promise( (resolve, reject) => {
    service.createSession({
      assistant_id: assistant_id
    })
      .then(res => {
        if(debug) console.log("Session Created")
        if(debug) console.log(res.session_id)
        resolve(res.session_id)        
      })
      .catch(err => {
        console.log(err);
        reject(err)
      });
  })
  
}
const saveMessageJSON = (watsonResponse) => {  
  const fs = require('fs')

  fs.writeFile("logs/watson-last-response.json", JSON.stringify( watsonResponse), function(err) {
    if(err) {
        return false
    }
    return true
  })



}

const formatSeparateMessages = (watsonResponseArray) =>  {    

  const responses = watsonResponseArray  
  .filter( response => response.response_type === 'text')
  .map( response => {
    if(response.values){
      return response.values[Math.floor(Math.random() * response.values.length)]
    }else{
      return response.text
    }
    
  })  

  return responses
}

module.exports = { watsonMessage }