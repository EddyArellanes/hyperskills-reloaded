/**
 * Middlewre for Routes that required JWT Authenticated
 * I called jwtWall to my function that use library jwt to verify tokens just for fun
 * Little Guide was taken from here:
 * https://medium.com/@patrykcieszkowski/jwt-authentication-in-express-js-ee898b87a60
 * */

import jwt from "../lib/auth-jwt"

export function jwtWall(req, res, next)
{
  console.log("Body")
  console.log(req.body)
  let token = (req.body.token) ? req.body.token : req.params.token

  console.log("Token:")
  console.log( token)
  jwt.verifyAsync(token)
    .then( (decodedToken) =>
    {
      req.user = decodedToken
      next()
    })
    .catch((err) =>
    {
      res.status(401)
        .json({message: "Invalid auth token provided."})
    })
}