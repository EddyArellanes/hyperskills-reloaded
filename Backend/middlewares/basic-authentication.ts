/**
 * Middlewre for Routes that required Basic Authenticated
 * Little Guide was taken from here:
 * https://jasonwatmore.com/post/2018/09/24/nodejs-basic-authentication-tutorial-with-example-api#user-service-js
 * */
import Logger from '../lib/Logger'
import Response from '../lib/Response'
import BasicAuthentication from '../classes/BasicAuthentication'


export function basicAuthWall(req, res, next)
{
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 401, "Basic Authorization Header Missing")
    new Response( res, 401 ,req.baseUrl, req.method, {code: 401} , "Basic Authorization Header Missing")   
  }
  else{
    const basicAuth = new BasicAuthentication( req.headers.authorization)
    
    if( !basicAuth.verify()){
      new Logger('error').createError(`${ req.baseUrl} ${ req.method} `, 401, "Basic Authorization Header Missing")
      new Response( res, 401 ,req.baseUrl, req.method, {code: 401} , "Credentials Rejected") 
    }else{
      next()
    }
  }
}