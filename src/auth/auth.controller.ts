import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoggedIn } from './auth.interfaces'
import { RecoverPasswordDto } from './dto/recover-password.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { LoginDto } from './dto/login.dto'
import { SignInDto } from './dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<LoggedIn> {
    return this.authService.login(loginDto.username, loginDto.password)
  }

  @Post('signIn')
  signIn(@Body() signInDto: SignInDto): Promise<void> {
    return this.authService.signIn(signInDto)
  }

  @Post('recover-password')
  recoverPassword(@Body() recoverPassword: RecoverPasswordDto): Promise<void> {
    return this.authService.recoverPassword(recoverPassword)
  }

  @Post('change-password')
  changePassword(@Body() recoverPassword: ChangePasswordDto): Promise<void> {
    return this.authService.changePassword(recoverPassword)
  }
}
