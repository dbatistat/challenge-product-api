import { BadRequestException } from '@nestjs/common'

export class FindUserNotExistException extends BadRequestException {
  constructor() {
    super('Find user exist with the same username or email')
  }
}
