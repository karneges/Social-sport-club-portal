import { User } from '../../../models/user.model';

export interface Post {
  _id: string
  author: User
  publicationDate: Date
  likes: number
  content: string
}
