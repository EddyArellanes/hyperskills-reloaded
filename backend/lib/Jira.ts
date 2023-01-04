import * as fetch from 'node-fetch';

export default class Jira{
  email:String
  token:String
  endpoint:String
  id: Number
  key: String
  type:String //Software | Service Desk

  constructor( id?:Number, key?:String){
    this.endpoint = process.env.JIRA_ENDPOINT
    this.email = process.env.JIRA_EMAIL
    this.token = process.env.JIRA_TOKEN
    this.id = id || 0;
    this.key = key || '';
  }

  async getProject(){
    try{

      return await  fetch(this.endpoint + '/project/' + this.key, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(
            'integracion-jira@something.com:{token}'
          ).toString('base64')}`,
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err));
    }catch(e){
      console.log('Unexpected error at Jira::getProject', e)
    }
  }

  async createIssue(){
    try{
      console.log('This project', this);
      const body = {
        update: {},
        fields: {
          summary: 'Nueva oportunidad de Compra',
          // parent: { key: this.key}, // ID de la Epica/Historia/Tarea
          issuetype:{ id: 10002},
          customfield_10029: [{id:"10035"}], // No aplica ningún Chapter ja
          // components:[{ id: 10002}], // Nose que es ja
          project: { id: this.id},
          labels: [ 'opportunity', 'purchase'],
          // timetracking: { remainingEstimate: 3, originalEstimate: 3} 
        }
      };

      return await  fetch(this.endpoint + '/issue', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(
            'integracion-jira@kavak.com:fJcUFxQSQdB4aeLlwL6o3F5B'
          ).toString('base64')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(response => {
        console.log('Response RAW', response) 
        return response.json()
      })
      .then(response => response)
      .catch(err => console.error(err));
    }catch(e){
      console.log('Unexpected error at Jira::createIssue', e)
    }
  }
}