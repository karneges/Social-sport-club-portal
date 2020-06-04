export interface User {
  name: string
  email: string
  age: number
  sex: 'male' | 'female'
  dateAddToClub: Date
  role: 'admin' | 'trainer' | 'user'
  countDaysInClub: number
  rating: string
  training: string
  invites: string
  challenges: string
  statistics: string,
  password: string
  resetPasswordToken: string
  resetPasswordExpire: Date
  createdAt: Date
}
