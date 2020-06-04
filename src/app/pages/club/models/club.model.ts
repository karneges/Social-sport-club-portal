import { User } from '../../../models/user.model';

export interface Club {
  name: string
  owner: string
  registerDate: Date
  users: string []
  clubEvents: string[]
  clubRating: number
  posts: string[],
}
