export interface AccessToken {
  token: string
  refreshToken: string
  expiresIn: string
}

export interface AccessTokenResponse extends AccessToken {
  success: boolean
}
