import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoggedIn } from './auth.interfaces'
import { RecoverPasswordDto } from './dto/recover-password.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { LoginDto } from './dto/login.dto'
import { SignInDto } from './dto/sign-in.dto'
import { PublicUser } from '../user/user.interfaces'
import { AuthGuard } from './auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<LoggedIn> {
    return this.authService.login(loginDto.username, loginDto.password)
  }

  @Post('user')
  @UseGuards(AuthGuard)
  getUserByToken(@Request() req): Promise<PublicUser> {
    return this.authService.getUser(req.user.userId)
  }

  @Post('signIn')
  signIn(@Body() signInDto: SignInDto): Promise<void> {
    return this.authService.signIn(signInDto)
  }

  @Post('reset-password-request')
  resetPasswordRequest(
    @Body() recoverPassword: RecoverPasswordDto,
  ): Promise<void> {
    return this.authService.resetPasswordRequest(recoverPassword)
  }

  @Post('reset-password')
  changePassword(@Body() recoverPassword: ChangePasswordDto): Promise<void> {
    return this.authService.resetPassword(recoverPassword)
  }
}
