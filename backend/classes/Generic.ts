//Stuff that I don't know where to put, in fact is a Bad practice create a Class Multipurpose but well
//... Later xPPP

export default class Generic{
  getBaseUrl( dir ){
    let backPath = dir.split("/")
    const path = backPath.slice( 0, backPath.length - 2)
    const finalPath = path.join('/')
    
    return finalPath    

  }
}