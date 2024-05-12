import { BadRequestException } from '@nestjs/common'

export class TokenInvalidException extends BadRequestException {
  constructor() {
    super(`Token invalid`)
  }
}
