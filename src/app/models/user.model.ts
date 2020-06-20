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
}
