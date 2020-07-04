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
  [key: string]: MessageCameFromServer[];

  public static convertOneMessageEntityToObject(message: BaseMessageEntity) {
    return Object.values(message)[0][0]
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
  sender: Partial<User>
  users: string[]

  constructor(message: string, sender: Partial<User>, receiver: string) {
    this.message.text = message
    this.sender = sender
    this.users = [receiver, sender._id]
  }

  public static clientCreatedMessagesFactory(message: string, sender: Partial<User>, receiver: string) {
    return {
      [receiver]: [new NewMessageClientCreated(message, sender, receiver)]
    }
  }
}





