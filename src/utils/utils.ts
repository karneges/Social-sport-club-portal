import { Post } from '../app/pages/club/models/post.model';

export const dateComparer = (a: Post, b: Post): 1 | -1 => {
  const aDate = new Date(a.publicationDate).getTime()
  const bDate = new Date(b.publicationDate).getTime()
  if (aDate < bDate) {
    return 1
  } else {
    return -1
  }
}
