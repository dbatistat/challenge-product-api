import { IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RecoverPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string
}
