import { BadRequestException } from '@nestjs/common'

export class UserNotExistException extends BadRequestException {
  constructor() {
    super('User exist with the same username or email')
  }
}
