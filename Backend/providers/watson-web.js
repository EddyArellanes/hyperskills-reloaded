const AssistantV2 = require('ibm-watson/assistant/v2')
const assistants = require('../config/assistantsIndex')
const debug = false

console.log("assistants")
console.log(assistants)

const getWatsonAssistantId = ( assistant) => {
  try{
    console.log("Asssitant ID")
    console.log(assistants[assistant].watson.assistantId)
    return assistants[assistant].watson.assistantId
  }catch( error){

  }
}
const createService = () =>{
  return new AssistantV2({
    version: '2019-07-17',
    iam_apikey: process.env.ASSISTANT_IAM_APIKEY,
    url: process.env.ASSISTANT_URL,
    disable_ssl_verification: true
  })
}
const watsonMessage = async (message, assistant) => {
  try{
    return new Promise( async (resolve, reject) =>{    
      const service = createService()
      const assistantID = getWatsonAssistantId( assistant)
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

const formatResponse = (watsonResponseArray) =>  {    

  const responses = []

  watsonResponseArray.generic  
  .filter( response => response.response_type === 'text')
  .map( response => {
    if(response.values){
     responses.push(
      {
        author: 'support',
        type: 'text',
        id: 1, // or text '1'
        isEdited: false,
        data: {
          text: response.values[Math.floor(Math.random() * response.values.length)],
          meta: new Date()
        }
      }       
     )
    }else{
      responses.push(
        {
          author: 'support',
          type: 'text',
          id: 1, // or text '1'
          isEdited: false,
          data: {
            text: response.text,
            meta: new Date()
          }
        }         
      )
    }
    
  })  
  if(watsonResponseArray.user_defined){
    //Attachment is pending because vue-beautiful-chat are not supported
    if(watsonResponseArray.user_defined.facebook.attachment){
      const facebookAttachment = 
      {
        author: 'support',
        type: 'attachment',
        id: 1, // or text '1'
        isEdited: false,
        data: {
          text: '',
          attachments: watsonResponseArray.user_defined.facebook.attachment.payload.elements,
          meta: new Date()
        },
        
      }        
      responses.push( facebookAttachment)
    }
    //Quick Replies
    if(watsonResponseArray.user_defined.facebook.quick_replies){
      const replies = watsonResponseArray
      .user_defined.facebook.quick_replies.map( reply => reply.title)
      responses.push(
        {
          author: 'support',
          type: 'text',
          id: 1, // or text '1'
          isEdited: false,
          data: {
            text: watsonResponseArray.user_defined.facebook.text,
            meta: new Date()
          },
          suggestions: replies
        } 
      )
    }
  }
  return responses
}

module.exports = { watsonMessage }