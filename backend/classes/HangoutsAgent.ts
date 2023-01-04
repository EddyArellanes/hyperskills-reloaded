export default class HangoutsAgent{
  username: string
  firstName: string
  email: string
  message: string
  template: object

  constructor(username: string, email: string, message: string){
    this.generateTemplate()
    this.username = username
    this.firstName = this.getFirstName( this.username)
    this.email = email
    this.message = message
      
  }
  getFirstName( fullname){
    return fullname.split(' ')[0]
  }
  generateTemplate(){
    this.template = {
      cards: [
        {
          sections: [
            {
              widgets: [
                {
                  image: { imageUrl: "http://p8cdn4static.sharpschool.com/UserFiles/Servers/Server_1015762/Image/Google/Google.png" }
                },
                {
                  buttons: [
                    {
                      textButton: {
                        text: "Text",
                        onClick: {
                          openLink: {
                            url: "https://google.com.mx"
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }

  responseMessage(){

  }
}
//https://developers.google.com/hangouts/chat/reference/message-formats/basic