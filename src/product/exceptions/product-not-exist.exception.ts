import { BadRequestException } from '@nestjs/common'

export class ProductNotExistException extends BadRequestException {
  constructor() {
    super('Product not exist')
  }
}
