import { BadRequestException } from '@nestjs/common'

export class RecoverUserNotExistException extends BadRequestException {
  constructor(email: string) {
    super(`User doesn't exist with the email ${email}`)
  }
}
