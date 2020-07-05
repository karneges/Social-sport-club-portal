export interface MessageCameFromServerAndAdapt {
  text: string
  time?: string
  sender: Partial<User>
  read?: boolean
  _id?: string
}

import { User } from '../../../models/user.model';


export interface MessageResponseWithOneCompanion {
  status: string,
  count: number,
  messages: BaseMessageEntity
}

export interface MessageResponseWithSomeCompanion {
  status: string,
  count: number,
  messages: BaseMessageEntity[]
}

export interface MessageResponseWithSomeCompanions {
  status: string,
  count: number,
  messages: BaseMessageEntity[]
}



export class BaseMessageEntity {
  [key: string]: {
    messages: MessageCameFromServer[],
    countNoReadMessages?: number,
    _id?: string
  }

  constructor(fieldName: string, message: {
    messages: MessageCameFromServer[],
    countNoReadMessages: number,
    _id: string
  }) {
    this[fieldName] = message
  }

  public static convertOneMessageEntityToObject(message: BaseMessageEntity): MessageCameFromServer {
    return Object.values(message)[0].messages[0]
  }

  public static messageFactory(messages: BaseMessageEntity[]) {

  }
}


export interface MessageCameFromServer {
  _id?: string
  message: {
    text: string,
    time?: string
  },
  sender: Partial<User>
  read?: string
}


export class NewMessageClientCreated {
  message = {
    text: ''
  }
  sender: Partial<User> | string
  users: string[]

  constructor(message: string, sender: Partial<User>, receiver: string) {
    this.message.text = message
    this.sender = sender
    this.users = [receiver, sender._id]
  }

  public static clientCreatedMessagesFactory(message: string, sender: Partial<User>, receiver: string): BaseMessageEntity {
    return {
      [receiver]: { messages: [new NewMessageClientCreated(message, sender, receiver)], }
    }
  }

  public static getRequestModel(messages: BaseMessageEntity): NewMessageClientCreated {
    let newMessage: NewMessageClientCreated
    Object.keys(messages).forEach(messageCompanionId => {
      newMessage = {
        // index [0] because all message must be in array, even if it is new one message
        message: messages[messageCompanionId].messages[0].message,
        sender: messages[messageCompanionId].messages[0].sender,
        users: [messages[messageCompanionId].messages[0].sender._id, messageCompanionId]
      }
    })
    return newMessage
  }
}







