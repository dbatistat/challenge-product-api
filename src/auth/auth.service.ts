import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import {
  ChangePassword,
  LoggedIn,
  RecoverPassword,
  SignIn,
} from './auth.interfaces'
import { encryptPassword } from '../util/utils'
import { EmailService } from '../email/email.service'
import { RecoverUserNotExistException } from './exceptions/recover-user-not-exist.exception'
import { User } from '../user/user.entity'
import { v4 as uuidv4 } from 'uuid'
import * as process from 'process'
import { TokenInvalidException } from './exceptions/token-invalid.exception'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async login(username: string, password: string): Promise<LoggedIn> {
    const passwordEncrypted = encryptPassword(password)
    const user = await this.userService.existLoggedUser({
      username,
      password: passwordEncrypted,
    })

    if (user == null) {
      throw new UnauthorizedException()
    }

    const payload = {
      sub: user.id,
      username: user.username,
    }

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    }
  }

  async signIn(signIn: SignIn): Promise<void> {
    await this.userService.create(signIn)
  }

  async recoverPassword({ email }: RecoverPassword): Promise<void> {
    const user: User = await this.userService.findUser({ email })

    if (user == null) {
      throw new RecoverUserNotExistException(email)
    }

    const token = uuidv4()

    await this.userService.update(user.id, { recoverPassword: token })

    await this.emailService.sendRecoverPasswordEmail({
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      link: `${process.env.URL}/recover-password?token=${token}`,
    })
  }

  async changePassword({ token, newPassword }: ChangePassword): Promise<void> {
    const user: User = await this.userService.findUser({ token })

    if (user == null) {
      throw new TokenInvalidException()
    }

    await this.userService.update(user.id, {
      password: newPassword,
      recoverPassword: '',
    })
  }
}
