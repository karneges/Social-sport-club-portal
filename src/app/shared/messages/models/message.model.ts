export interface MessageCameFromServerAndAdapt {
  text: string,
  time?: string,
  sender: string
}

export class MessageCameFromServerAndAdapt {
  text: string
  time?: string
  sender: string

  constructor(message: MessageCameFromServer) {
    this.text = message.message.text
    this.time = message.message.time
    this.sender = message.sender
  }
}

export interface MessageCameFromServer {
  message: {
    text: string,
    time: string
  },
  users: string
  sender: string
  read: string
  receiver: string
}

// export interface NewMessageClientCreated {
//   message: {
//     text: string,
//   },
//   sender: string,
//   users: string[],
//   receiver?: string
// }


export class NewMessageClientCreated {
  message = {
    text: ''
  }
  sender: string
  users: string[]
  receiver?: string

  constructor(message: string, sender: string, receiver: string) {
    this.message.text = message
    this.sender = sender
    this.receiver = receiver
    this.users = [receiver]
  }
}

// export const prepareMessage = (message: string, sender: string, receiver: string): NewMessageClientCreated => {
//   return {
//     message: {
//       text: message
//     },
//     sender,
//     users: [receiver],
//     receiver
//   }
// }



