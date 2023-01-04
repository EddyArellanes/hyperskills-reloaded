const dotenv = require('dotenv')
const dialogflow = require('dialogflow')
const uuid = require('uuid')
dotenv.config()
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} textQuery Query to send to DialogFlow
 * @param {string} appUserId OPTIONAL - UserID will work session ID
 */
async function runRequest(text, appUserId) {
  try{ 
    
    // A unique identifier for the given session
    const projectId = process.env.DIALOG_FLOW_PROJECT_ID
    const sessionId = (appUserId) ? appUserId : uuid.v4()
    const textRequest = (text) ? text : 'Hello'
    
    
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient()
    const sessionPath = sessionClient.sessionPath(projectId, sessionId)
    

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: textRequest,
          // The language used by the client (en-US)
          languageCode: 'es-MX',
        },
      },
    }

    // Send request and log result
    //console.log("Response")
    //console.log(responses)
    //console.log('Detected intent');
    const responses = await sessionClient.detectIntent(request)
    const result = responses[0].queryResult
    const messagesRaw = result.fulfillmentMessages
    const messages = getMessages( messagesRaw)
    console.log(`Result:`)
    //console.log(result)

    console.log("Platforms")
    console.log(messages)
    
    //console.log(`Query: ${result.queryText}`)
    //console.log(`Response: $l.fulfillmentText}`)
    return messages

    if (result.intent) {
      //console.log(`  Intent: ${result.intent.displayName}`)
    } else {
      //console.log(`  No intent matched.`);
    }
  }catch(error){
    console.log("Error DialogFlow-Request")
    console.log(error)
  }
}

function getMessages(messages){
  
  return messages.filter( message => message.text ).map( message => message.text.text)  
}

//
//const crede = process.env.GOOGLE_APPLICATION_CREDENTIALS
runRequest()
module.exports = {
  runRequest
}