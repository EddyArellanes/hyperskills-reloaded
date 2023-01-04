const { WatsonMiddleware } = require('botkit-middleware-watson')
const dotenv = require('dotenv')

dotenv.config()

const initialize = () =>{
  return new WatsonMiddleware({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: process.env.WATSON_ASSISTANT_URL,
    //workspace_id: YOUR_WORKSPACE_ID,
    version: '2018-07-10',
    minimum_confidence: 0.50, // (Optional) Default is 0.75
  })
}
const integrate = (controller) => {  
  const watsonMiddleware = initialize()  
  controller.middleware.receive.use(watsonMiddleware.receive.bind(watsonMiddleware))  
  console.log("Will enter?")

  controller.on('message', 'facebook_postback', async function(bot, message) {
    console.log("Did enter?")
    if (message.watsonError) {
      console.log("IBM NOT Hears")
      await  bot.reply(message, "I'm sorry, but for technical reasons I can't respond to your message");
    } else {
      console.log("IBM Hears")
      await bot.reply(message, message.watsonData.output.text.join('\n'));
    }
  })
}
module.exports = {
  initialize,
  integrate
}