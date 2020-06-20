export interface RegisterModelResponse {
  name: string,
  email: string,
  password?: string,
  gId?: string
  role?: 'admin' | 'trainer' | 'user',
  photoUrl?: string
}

export interface RegisterModelRequest {
  name: string,
  email: string,
  password?: string,
  gId?: string
}
