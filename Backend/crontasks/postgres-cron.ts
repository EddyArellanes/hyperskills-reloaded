import PostgresClient from '../classes/PostgresClient'
const postgres = new PostgresClient()
/**
* Description: PostgresSQL Cron for every Day Generate the Daily Tasks
* Working under PostgreSQL

* @return { Boolean} - Boolean if The SQL is Successfull
* */
module.exports = async () => {
  const id = 3
  const data = await postgres.query(`SELECT * from getSkillSingle($1)`, [ id])
  const codeResponse = (data.length === 0) ? 204 : 200
  const skill = (data.length === 0) ? {} : data[0]
  console.log("Result", skill)
}