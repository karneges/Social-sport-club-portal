export interface User {
  _id: string
  name: string
  email: string
  age: number
  sex: 'male' | 'female'
  dateAddToClub: string
  role: 'admin' | 'trainer' | 'user'
  countDaysInClub: number
  rating: number
  training: string
  invites?: any
  challenges?: any
  statistics: string,
  password: string
  createdAt: string,
  photoUrl?: string
  isOnline: boolean
  strava: {
    athlete: StravaAthlete
  }
}

export interface UserWithCountMessages extends User {

  noReadMessagesCount: number
}

export interface StravaAthlete {
  id: number,
  username: string,
  resource_state: number,
  firstname: string,
  lastname: string,
  city: string,
  state: string,
  country: string,
  sex: string,
  premium: Boolean,
  created_at: string,
  updated_at: string,
  badge_type_id: number,
  profile_medium: string,
  profile: string,
  friend: string,
  follower: string,
  follower_count: number,
  friend_count: number,
  mutual_friend_count: number,
  athlete_type: number,
  date_preference: string,
  measurement_preference: string,
  clubs: [],
  ftp: string,
  weight: number,
}
