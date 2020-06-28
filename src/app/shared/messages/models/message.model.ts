export interface MessageCameFromServerAndAdapt {
  text: string,
  time?: string,
  sender: string
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

export interface NewMessageClientCreated {
  message: {
    text: string,
  },
  sender: string,
  users: string[],
  receiver?: string
}


