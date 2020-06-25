export interface MessageCameFromServer {
  message: {
    text: string,
    time?: string
  },
  sender: string,
  users: string[]
  read?: string,
}
export interface NewMessageClientCreated {
  message: {
    text: string,
  },
  sender: string,
  users: string[]
}


