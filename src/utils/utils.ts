import { Post } from '../app/pages/club/models/post.model';
import { AccessToken } from '../app/pages/auth/models/auth.models';

export const dateComparer = (a: Post, b: Post): 1 | -1 => {
  const aDate = new Date(a.publicationDate).getTime()
  const bDate = new Date(b.publicationDate).getTime()
  if (aDate < bDate) {
    return 1
  } else {
    return -1
  }
}

export const isTokenExpired = (expiresIn: string) => {
  const tokenExpireDate = new Date(expiresIn).getTime()
  const dateNow = new Date().getTime()
  return dateNow > tokenExpireDate
}
