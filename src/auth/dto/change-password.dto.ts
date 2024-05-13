import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ChangePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  token: string

  @IsNotEmpty()
  @ApiProperty()
  newPassword: string
}
