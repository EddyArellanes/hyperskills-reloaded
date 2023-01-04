# Beemera Framework
## This is a simple compilation of tools ready to use to build faster NodeJs Backend


# Setup
> npm install
> npm run dev

# Build

To get the final Server JS run:
> npm run transpile

To run JS /dist server run:
> npm run start

# Project Structure
classes: Classes to implement like Jira API, Basic Auth, etc.
controllers: Layer to handler the logic of the Services, they are binded into routes with the same name
crontasks: Under Construction
databases: Backups to Sync Local - Heroku
dist: Typescript compiled
entities: Database Models for Sequelize
lib: Re-usable code for the entire project like Logger
middlewares: Layers to execute before arrive to the Route, JWT, Validations, etc.
providers: Under Construction
routes: Handler Request-Endpoint-Controller

# Deploy on Heroku
In the root you'll discover a file called: Procfile 
Inside you can define the main command to run by NodeJs and Define Singletons, Tasks, etc. If you want, after that run commands:
> git add -A
> git commit -m "<DESCRIPTION_DID_YOU_DO>"
> git push heroku master

If you want to send .env variables as real environment variables on Heroku Dyno, you can do in two ways
> heroku config:set TIMES=2
Or copy all .env vars
> heroku local


`The list of Modules ready to use are:`
- Typescript: Typescript for the Backend side, to have more scalability in the Future [ts-node]
- Express: Server for Nodejs
- Nodemon: For recharge every change in the Server
- Morgan: For have Middlewares in requests
- Winston: To have a Logger with the Errors and Requests
- PostgresClient: To connect Easily to PG
- Auth JWT Middleware: Reject no authenticated jwt requests

Useful Tutorials that helped me a lot
https://jonathanmh.com/typescript-node-js-tutorial-backend-beginner/

Issues that I had on the way
-For typescript sintaxis in VSCode es needed the tsconfig.json with the lib declared, otherwise, set the config directly in preferences 
https://stackoverflow.com/questions/43555378/ts-an-async-function-or-method-in-es5-es3-requires-the-promise-constructor

`Working on JWT and OAUTH2.0 Functionallity D:`

--Above Updated 18-December


`Things not contempled in Postgres Connector at the moment:`
> Set the Port other than default


`Core Always included:`
> Typescript
> Express
> Winston
> Morgan


`Next steps are create an NPM Installer with Options you want, particullary:`
> PostgresSQL 
  Modules:
  > sequelize
  > pg
  > pg-hstore
  Environment
  > POSTGRESQL_DATABASE = hypertracker
  > POSTGRESQL_USER = postgres
  > POSTGRESQL_PASSWORD = root
  > POSTGRESQL_HOST = localhost

  Models
  >postgresql-models.ts Just documentation to show how it works

> JWT Auth
  Modules
  > jsonwebtoken
  Environment
  > AUTH_JWT_SECRET

  In the Future I'll create a YAML or other kind of Configuration project to activate/disable features like PostgresQL Connector, JWT, etc.



  Success Factor
   uri : "https://api8.successfactors.com:443/odata/v2/User('600574')/userIdOfWorkScheduleNav"



Hangouts Google Dev
  https://developers.google.com/hangouts/chat/concepts/cards
  https://developers.google.com/hangouts/chat/reference/message-formats/cards

# Dialogflow Setup
Dialogflow doesn't have any Integration called "Webhook" or something like that, then if you need to connect with for example Web Channel or Whatsapp Channel(Using Smooch or Twilio) then you need it API v2, that requires the following.

1. In Dialogflow Platform, in Settings you will see a Project ID, you will need this as parameter to the endpoint in the routes, for example for Web channel

http://localhost:4001/api/chatbot/web/dialogflow/kio-ndhfca

2. You will need a Token to be able to access from NodeJS to Dialogflow API, for that in Settings -> Google Project -> click on Service accout
3. You'll create a new Service account with the roles:
- Api administrator for Dialogflow
- Api client for dialogflow
- Api Reader for dialogflow, I'm not sure if this is required for our bussiness

4. Create key, format JSON and download it
5. Place the json here /ssh and rename as dialogflow.js (This need to be improved)
6. That's all you now can use Dialogflow to connect Web/Whatsapp

Possible issues:
- Issue: Google dialogflow PERMISSION_DENIED Exception
- Reason: Your project ID are wrong
https://miningbusinessdata.com/handling-unexpected-user-input-in-dialogflow/
# Twilio Whatsapp

To be able to use Twilio Wa, do the following:
1. Create a Project in Twilio and go to Settings
2. Open Settings and got
  TWILIO_SID
  TWILIO_TOKEN
3. For last got the Sandbox phone number
  TWILIO_PHONE_NUMBER


# Problems without resolution
remote:  routes/Chatbot-Integrations/Whatsapp.ts(2,20): error TS2307: Cannot find module '../../lib/Logger'

possible solution: https://dev.to/larswaechter/path-aliases-with-typescript-in-nodejs-4353

Estoy pensando que podría ser la versión con la que quise enviarlo , que fue la 10.3.0, probaré luego con la 10.10.0


# Success Factor Odata
https://www.odata.org/getting-started/basic-tutorial/#search
Endpoint
https://9188e394.ngrok.io/api/sapsf/kio-ndhfca



Deployed Success Factor
https://kio-sapsf-2.herokuapp.com/api/sapsf/kio-ndhfca


EngineZero will exist thanks to:
https://github.com/axa-group/nlp.js/tree/master/docs


# 08 November 2019
I need restructuring and make "liviano" this Backend and control the number of Dependencies I'm Using. I think I will fork this Project, I will liberate this as Version 1 and after that I will remove all stuff I'm not using

Express-Validator is OK for FORMS: https://express-validator.github.io/docs/
JOI Will be used for NLP