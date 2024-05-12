export interface FindUser {
  username?: string
  email?: string
  token?: string
}

export interface ExistUser {
  username: string
  password: string
}

export interface CreateUser {
  username: string
  password: string
  email: string
  fullname: string
}

export interface UpdateUser {
  password?: string
  recoverPassword?: string
}