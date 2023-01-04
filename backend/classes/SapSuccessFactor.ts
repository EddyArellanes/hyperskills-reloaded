import axios from 'axios'
import * as moment from 'moment'

export default class SapSuccessFactor{
  identityColor: string //Color de KIO
  textColor:string = '#fec529'  
  textColorSecond: string = '#3a645e'
  textColorThird: string = '#000000'
  primaryColor:string = '#9f8031'
  endpoint: string //Endpoint for Success Factor
  username: string //Credentials for Auth
  company: string  //Credentials for Auth
  password: string //Credentials for Auth
  userSap: string  //User that you want to get INFO. At moment is dummy
  yearsForVacations: number //Years Difference between when employeer enter to work vs today
  debug: boolean   //To Print console.log, info, error, etc.

  constructor( username: string, company: string, password: string, endpoint: string) { 
    this.username = username
    this.company = company
    this.password = password
    this.endpoint = endpoint         
    this.userSap = `602123`  
  } 

  async connect( entity){
    const url = this.endpoint + entity
    //console.log("URL", url)
    return new Promise( ( resolve, reject) => {
      axios.get( url, {              
        auth: {
          username: this.username + '@' + this.company,
          password: this.password
        }        
    })
    .then( response =>{
        //if( this.debug) console.log("Respuesta de Success Factor")
        //if( this.debug) console.log( response.data['EntitySets'])

      resolve(response.data)

    }).catch( error => {
      console.log("/SapSuccessFactor.ts connect() : Error", error.message)
      console.error( error.message)
    })
    })

  }
  async connectRaw( endpoint){
    const url = endpoint    
    return new Promise( ( resolve, reject) => {
      axios.get( url, {              
        auth: {
          username: this.username + '@' + this.company,
          password: this.password
        }        
    })
    .then( response =>{
      if( this.debug) console.log("Respuesta de Success Factor")
      if( this.debug) console.log( response.data['EntitySets'])

      resolve(response.data)

    }).catch( error => {
      console.log("/SapSuccessFactor.ts connectRaw() : Error", error.message)
      console.error( error.message)
    })
    })

  }
  async getCompensations(){
    try{    
      this.debug = false
      const data: any = await this.connect(`/EmpCompensation?$filter=userId eq ${this.userSap}`)            
      const compensations: any = data.d.results[0]      
      
      if( this.debug) console.log("Prestaciones", compensations)
      if( this.debug) this.saveInformation( compensations, "OData-EmpCompensation")
      
      return compensations

    }catch(e){

      console.log("/SapSuccessFactor.ts getCompensations(): Error", e.message)
    }
  }  
  async getArea(){
    try{    
      const data:any = await this.connect(`/EmpJob?$filter=userId eq ${this.userSap}`)
      const nav:any = data.d.results[0]
      const area:any = await this.connectRaw( nav.businessUnitNav.__deferred.uri) 
      
      if( this.debug) console.log("area", area)
      if( this.debug) this.saveInformation( nav, "OData-EmpJob")
      if( this.debug) this.saveInformation( area, "OData-FOBusinessUnit")
      return area.d.name

    }catch(e){

      console.log("/SapSuccessFactor.ts getArea(): Error", e.message)
    }
  }
  async getVacationDates(){    
    try{    
      this.debug = false
      moment.locale('es')
      const data: any = await this.connect(`/EmpEmployment?$filter=userId eq ${this.userSap}`)
      const employmentData: any = data.d.results[0]      
      //Regexp to extract numbers
      let startDate = employmentData.startDate.match(/\d+/g).map( Number)[0]
      let vacationDate = employmentData.professionalServiceDate.match(/\d+/g).map( Number)[0]
      this.yearsForVacations = (moment (new Date() ).diff( moment( startDate), 'years'))
      const canTakeVacations = (this.yearsForVacations > 0) ? true : false

      startDate = moment( startDate).format('LL')
      vacationDate = moment( vacationDate).add(12, 'M').format('LL')                                

      if(this.debug) console.log("vacactions", { startDate, vacationDate, canTakeVacations })
      if( this.debug) console.log("StartDate", startDate)
      if( this.debug) this.saveInformation( employmentData, "OData-EmpEmployment")     
      return { startDate, vacationDate, canTakeVacations }

    }catch(e){

      console.log("/SapSuccessFactor.ts getVacationDates(): Error", e.message)
    }    
  }
  async getEmpJob(){
    this.debug = true
    const data: any = await this.connect(`/EmpJob?$filter=userId eq ${this.userSap}`)
    const empJob: any = data.d.results[0]      

    this.saveInformation( empJob, "OData-EmpJob")  

    return empJob
  }
  async getPosition(){
    this.debug = true
    const data: any = await this.connect(`/EmpJob?$filter=userId eq ${this.userSap}`)
    const empJob: any = data.d.results[0]      
    const data2: any = await this.connect(`/Position?$filter=code eq ${empJob.position}`)
    const position = data2.d.results[0]
    this.saveInformation( position, "OData-Position")  

    return position
  }
  async getBusinessManager(){
    this.debug = false
    const data: any = await this.connect(`/EmpJobRelationships?$filter=userId eq ${this.userSap}`)
    
    const empJobRelation: any = data.d.results.filter( user => user.relationshipType == 531)[0]
    const empJob: any = await this.getEmpJob()
    
    const positions: any = await this.connect(`/Position?$filter=code eq ${empJob.position}`)
    const position = positions.d.results[0]
        
    const data2: any = await this.connect(`/User?$filter=userId eq ${empJobRelation.relUserId}`)
        
    
    
    this.saveInformation( empJobRelation, "OData-EmpJobRelationships")   
    this.saveInformation( position, "OData-Position")   
    if( this.debug) console.log("businessManagerInfo", data2)
    if( this.debug) this.saveInformation( data2, "OData-UserBusinessManager")   

    return {
      empJob,
      position,
      businessManagerInfo: {name: 'Cynthia Viramontes Colorado', email: 'cviramontes@kionetworks.com'}
    }
  }

  //Not used yet
  async getRequistionStatus( jobReqId){

    this.debug = true        
    const data: any = await this.connect(`/JobRequisition?$filter=jobReqId eq ${jobReqId}`)
    const requisition: any = data.d.results[0]
    const data2: any = await this.connect(`/JobApplication?$filter=jobReqId eq ${jobReqId}`)
    const applicationJob = data2.d.results
    const unknown = await this.connect(`/JobApplicationStatus?$filter=appStatusId eq 41`)
    const candidates =  await this.connect(`/JobReqFwdCandidates?$filter=jobReqId eq ${jobReqId}`)
    //const candidates: Array<any> = []

    /*for(const job of applicationJob){
      const candidate = await this.connect(`/JobReqFwdCandidates?$filter=candidateId eq ${job.candidateId}`)
      candidates.push( candidate)
    }*/

    if( this.debug) console.log("requisition", requisition)
    this.saveInformation( requisition, "OData-JobRequisition")   
    this.saveInformation( applicationJob, "OData-JobApplication")   
    this.saveInformation( candidates, "OData-JobReqFwdCandidates")   
    this.saveInformation( unknown, "OData-Miscelanious")   

    return true
  }  
  async saveInformation( data, filename){ 
    const name = filename || 'OdataInfo-Generic'
    const fs = require('fs').promises       
    await fs.writeFile(`./${name}.txt`, JSON.stringify(data))           
  }
  //Required first call getVacationDates  
  calculusVacationDays(){
    
    //if( this.yearsForVacations === undefined) await this.getVacationDates
    
    switch ( this.yearsForVacations) {
      case 0:
      case 1:
      case 2:        
      case 0:      
        return 10
      case 4:
        return 14
      case 5:
      case 6:        
      case 7:      
      case 8:      
      case 9:            
        return 16
      case 10:
      case 11:
      case 12:
      case 13:  
      case 14:
        return 18           
      case 15:
      case 16:        
      case 17:
      case 18:        
      case 19:              
        return 20
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:                   
        return 22
      case 25:      
        return 24
      default:        
        return ( this.yearsForVacations >25 ) ? 24 : 'Debes obtener primero cuando entraste'
    }
  }
  canRequestRequsitions( code){
    switch ( code) {
      case 'M1':
      case 'M2B':
      case 'M2A':
      case 'M3B':
      case 'M3A':          
      case 'EX':
        return true                    
      default:
        return false          
    }
  }
}
