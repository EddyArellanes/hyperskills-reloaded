import * as admin from 'firebase-admin'

export default class FireStore{
  credentials:any
  dbName:string
  database: any

  constructor( serviceAccountJson:any, database:string){
   this.credentials = serviceAccountJson
   this.dbName = database
  }

  async initConnection(){
     admin.initializeApp({
      credential: admin.credential.cert( this.credentials),
      databaseURL: this.dbName
    })
    this.database = admin.database()
    return true
  }
}