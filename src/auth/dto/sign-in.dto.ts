import { IsEmail, IsNotEmpty } from 'class-validator'

export class SignInDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  fullname: string

  @IsNotEmpty()
  @IsEmail()
  email: string
}
