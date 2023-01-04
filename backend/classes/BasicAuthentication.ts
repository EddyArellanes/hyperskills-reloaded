export default class BasicAuthentication{
  
  username: string
  password: string

  constructor( authorization){
    const base64Credentials =  authorization.split(' ')[1];
    const credentials = Buffer.from( base64Credentials, 'base64').toString('ascii');
    const [ username, password] = credentials.split(':');
    this.username = username
    this.password = password
    //In the Future if I implemented a DB with Users xPP 
    //const user = await userService.authenticate({ username, password });    
  }

  verify(){
    return (this.username == 'panda' && this.password == 'koala') ? true : false
  }
}