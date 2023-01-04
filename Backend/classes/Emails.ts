const emails = {
  contact: {
    name:{
      type: 'String',
      required: true
    },
    phone:{
      type: 'Number',
      required: false
    },
    email: {
      type: 'Email',
      required: true
    },
    message: {
      type: 'String',
      required: false
    }
  }
}
  

export default  emails