/**
 * JWT Authentication Library that Will check JWT Auth if you decide to use as middleware in your Routes
 */
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
//At the moment I use Env variables but for these type of configurations I want to create a Configure Project file like YAML
dotenv.config()
const jwtSecret = process.env.AUTH_JWT_SECRET

const createToken = (email, username) =>{
  //Which is sub I don't remember jajaj
  return jwt.sign({sub: username, email, username}, jwtSecret)
}
const verify = (token) =>{
  const decoded = jwt.verify( token, jwtSecret)
  return decoded
}

const verifyAsync = (token) =>{
  return new Promise((resolve, reject) =>{
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err || !decodedToken)
      {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}
export default {
  createToken,
  verify,
  verifyAsync
}