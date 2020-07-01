import { convertArrayToObject } from '../utils/conver-array-to-object';

export interface MessageCameFromServerAndAdapt {
  text: string
  time?: string
  sender: Partial<User>
  read?: boolean
  _id?: string
}

import { User } from '../../../models/user.model';

// export class AdaptedMessage implements MessageCameFromServerAndAdapt {
//   text: string
//   time?: string
//   sender: Partial<User>
//   read: boolean
//   _id: string
//
//
//   constructor(message: MessageCameFromServer, sender: Partial<User>) {
//     this._id = message._id
//     this.text = message.message.text
//     this.time = message.message.time
//     this.sender = sender
//     this.read = false
//   }
//
//   markForRead() {
//     this.read = true
//   }
//
//   public static adaptedMessageFactory(messages: MessageCameFromServer[],
//                                       users: User[]): MessageCameFromServerAndAdapt[] {
//     const adaptedMessages: MessageCameFromServerAndAdapt[] = []
//     const convertedUsers = convertArrayToObject(users, '_id')
//     messages.forEach(message => {
//       adaptedMessages.push(new AdaptedMessage(message, convertedUsers[message.sender]))
//     })
//     return adaptedMessages
//   }
//
// }

export interface MessageResponseWithOneCompanion {
  status: string,
  count: number,
  messages: BaseMessageEntity
}

export interface MessageResponseWithSomeCompanions {
  status: string,
  count: number,
  messages: BaseMessageEntity[]
}

export interface BaseMessageEntity {
  [key: string]: MessageCameFromServer[]
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





