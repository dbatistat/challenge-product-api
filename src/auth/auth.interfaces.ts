export interface LoggedIn {
  accessToken: string
}

export interface Login {
  username: string
  password: string
}

export interface SignIn {
  username: string
  password: string
  fullname: string
  email: string
}

export interface RecoverPassword {
  email: string
}

export interface ChangePassword {
  token: string
  newPassword: string
}
