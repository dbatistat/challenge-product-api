import { BadRequestException } from '@nestjs/common'

export class SendEmailErrorException extends BadRequestException {
  constructor() {
    super(
      'Exist some problem sending the email for recover password with Emailjs',
    )
  }
}
