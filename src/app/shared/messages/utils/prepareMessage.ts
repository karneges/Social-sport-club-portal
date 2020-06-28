import { NewMessageClientCreated } from '../models/message.model';

export const prepareMessage = (message: string, sender: string, receiver: string): NewMessageClientCreated => {
  return {
    message: {
      text: message
    },
    sender,
    users: [receiver],
    receiver
  }
}
