import { IsNotEmpty } from 'class-validator'

export class ChangePasswordDto {
  @IsNotEmpty()
  token: string

  @IsNotEmpty()
  newPassword: string
}