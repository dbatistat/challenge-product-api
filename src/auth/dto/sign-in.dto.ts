import { IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignInDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string

  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsNotEmpty()
  @ApiProperty()
  fullname: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string
}
