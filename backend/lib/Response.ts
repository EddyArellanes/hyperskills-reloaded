export default class Response{
  code: number
  status: string
  url: string
  method: string
  data: any
  error: string
  res: any
  


  constructor( res: any, code: number, url: string, method: string, data: any , error ?: string){
    try{
      this.code = code
      this.status = this.getCodeError( code)
      this.url = url
      this.method = method
      this.data = data
      this.error = error
      this.res = res
      
      this.sendMessage()

    }catch( error){
      //console.log("Response.ts constructor:", error.message)
      //Maybe Here I will recall itself and Invoke Logger xD
     // return res.status( this.status).json( this.error)
    }


  }

  sendMessage(){
    try{
      const body:any = {
        status: this.status,
        data: this.data
      }
      //I'm not convinced where to put in Error, but is as easy as change into body.data.error and That's all
      if( this.error) body.error = this.error
  
      this.res.setHeader( 'Content-Type', 'application/json')
      return this.res.status( this.code ).json( body)
      
    }catch( error){
      console.log("Response.ts sendMessage:", error.message)
      return this.res.status( this.status).json( "Unavailable please try again later")
    }

  }

  getCodeError( status){
    switch ( status) {
      case 200:
        return "OK"
      case 201:
        return "Resource Created/Updated Successfully"
      case 204:
        return "Request processed succesfully but any content to show"
      case 303:
          return "Recources already has been created"        
      case 400:
        return "Bad request, be sure that data you're sending is valid"        
      case 500:
        return "Server not available, please retry later..."                    
      case 401:
          return "Unathorized"              
      default:
        return "Unknown system behavior please report to an administrator"        
    }
  }
}