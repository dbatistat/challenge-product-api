import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { RecoverPasswordEmail } from './email.interfaces'
import { SendEmailErrorException } from './exceptions/send-email-error.exception'

@Injectable()
export class EmailService {
  async sendRecoverPasswordEmail({
    username,
    fullname,
    email,
    link,
  }: RecoverPasswordEmail) {
    try {
      const data = {
        service_id: process.env.RECEMAIL_SERVICE_ID,
        template_id: process.env.RECEMAIL_TEMPLATE_ID,
        user_id: process.env.RECEMAIL_USER_ID,
        template_params: {
          username,
          fullname,
          recover_password_link: link,
          to_email: email,
          // Parámetros del template si los tienes
        },
        accessToken: process.env.RECEMAIL_ACCESS_TOKEN,
      }

      await axios.post('https://api.emailjs.com/api/v1.0/email/send', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new SendEmailErrorException()
    }
  }
}
