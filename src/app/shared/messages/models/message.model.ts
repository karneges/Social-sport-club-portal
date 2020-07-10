import { User } from '../../../models/user.model';


export interface MessageResponse {
  status: string,
  count: number,
  messages: BaseMessageEntity
}

export class BaseMessageEntity {
  [key: string]: {
    messages: BaseMessageModel[],
    countNoReadMessages?: number,
    _id?: string
  }
  public static convertOneMessageEntityToObject(message: BaseMessageEntity): BaseMessageModel {
    return Object.values(message)[0].messages[0]
  }
}


export class BaseMessageModel {
  _id?: string
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

  public static clientCreatedMessagesFactory(message: string, sender: Partial<User>, receiver: string): BaseMessageEntity {
    return {
      [receiver]: { messages: [new BaseMessageModel(message, sender, receiver)], }
    }
  }

  public static getRequestModel(messages: BaseMessageEntity): BaseMessageModel {
    let newMessage: BaseMessageModel
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







