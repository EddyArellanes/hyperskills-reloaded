import { CronJob} from 'cron'


export default class CronTasks {
  cronTasks: Array<Function>
  constructor(){
    this.cronTasks = this.getTasks()

    //All Gotchas = Every Sec.
    //Almost Every Gotchas = Every Minute 0 * * * * *
    //0 0 0 * * * Means Every New Day

    const job = new CronJob('0 * * * * *', async () => {
      //will run every day at 12:00 AM
      //How to execute all Jobs at the same Time 
      //Executing all the Functions 
      console.log("JOBS RUNNING:")
      for( const f of this.cronTasks){
        //They need to be a Promise 
        f()
      }
     })
    //The Maturity of the Idea is not enough yet :P
    //job.start()
  }
  getTasks(){
    //Here Will read programatically all Functions inside crontasks directory, and then load de Export Default function Inside
    const path = require("path")
    const {readdirSync, statSync} = require('fs');
    const directoryPath = path.join(__dirname, "../crontasks")
    const functions = []

    readdirSync( directoryPath, function(err, files) {
      if (err) {
        console.log("Error getting directory information.")
      } else {        
        
        files.forEach(function(file) {
          console.log("File", file)  
          functions.push( require(directoryPath + '/' + file))
        })
        console.log("Files", functions)
        
      }
    })

    return functions
    

  }
}