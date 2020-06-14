import { User } from '../../../models/user.model';

export interface Post {
  _id: string
  author: string
  publicationDate: Date
  likes: number
  content: string
  updateDate: Date
}
