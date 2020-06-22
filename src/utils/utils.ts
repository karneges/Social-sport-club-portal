import { Post } from '../app/pages/club/models/post.model';
import { User } from '../app/models/user.model';


export const dateComparerFact = (fieldName: string, reverse = false) => (a: Post, b: Post): 1 | -1 => {
  const aDate = new Date(a[fieldName]).getTime()
  const bDate = new Date(b[fieldName]).getTime()
  if (reverse ? aDate > bDate : aDate < bDate) {
    return 1
  } else {
    return -1
  }
}
export const onlineComparer = ({ isOnline }: User) => isOnline ? -1 : 1

export const isTokenExpired = (expiresIn: string) => {
  const tokenExpireDate = new Date(expiresIn).getTime()
  const dateNow = new Date().getTime()
  return dateNow > tokenExpireDate
}
