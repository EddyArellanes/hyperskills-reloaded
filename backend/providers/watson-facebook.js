const AssistantV2 = require('ibm-watson/assistant/v2')
const debug = false

const getWatsonAssistantId = () => {
  return process.env.WATSON_ASSISTANT_ID
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
          //const reply = formatResponseBotkit(res)                  
          const reply = formatResponse(res.output)
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

//res.output
const formatResponse = (watsonResponseArray) =>  {    

  const responses = []

  watsonResponseArray.generic  
  .filter( response => response.response_type === 'text')
  .map( response => {
    if(response.values){
     responses.push(response.values[Math.floor(Math.random() * response.values.length)])
    }else{
      responses.push(response.text)
    }
    
  })  
  if(watsonResponseArray.user_defined){
    
    if(watsonResponseArray.user_defined.facebook.attachment){
      const facebookAttachment = { channelData:{ attachment: watsonResponseArray.user_defined.facebook.attachment  } }
      responses.push(facebookAttachment)
    }
    if(watsonResponseArray.user_defined.facebook.quick_replies){
      
      const facebookAttachment = { 
        text: watsonResponseArray.user_defined.facebook.text,
        channelData:{ 
          text: watsonResponseArray.user_defined.facebook.text,
          quick_replies: watsonResponseArray.user_defined.facebook.quick_replies  } }
      responses.push(facebookAttachment)
    }
  }
  return responses
}


module.exports = { watsonMessage }