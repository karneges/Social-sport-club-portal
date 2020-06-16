import { User } from './user.model';

export interface Event {
  _id: string
  name: string
  eventType: 'train' | 'competition' | 'entertainment' | 'challenge'
  startDateTime: Date
  endDateTime: Date
  description: string
  location: {
    lat: string,
    lng: string
  },
  accessLevel: 'all' | 'privilege',
  excludeUsers: User[]
}
