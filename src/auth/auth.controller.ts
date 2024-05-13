import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RecoverPasswordDto } from './dto/recover-password.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { LoginDto } from './dto/login.dto'
import { SignInDto } from './dto/sign-in.dto'
import { PublicUser } from '../user/user.interfaces'
import { AuthGuard } from './auth.guard'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoggedInDto } from './dto/logged-in.dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Valid user',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() loginDto: LoginDto): Promise<LoggedInDto> {
    return this.authService.login(loginDto.username, loginDto.password)
  }

  @Post('user')
  @ApiResponse({
    status: 201,
    description: 'User exist',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: `User doesn't exist` })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getUserByToken(@Request() req): Promise<PublicUser> {
    return this.authService.getUser(req.user.userId)
  }

  @Post('signIn')
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  signIn(@Body() signInDto: SignInDto): Promise<void> {
    return this.authService.signIn(signInDto)
  }

  @Post('reset-password-request')
  @ApiResponse({
    status: 201,
    description: 'Request sent',
  })
  @ApiResponse({
    status: 400,
    description: `User doesn't exist with the email`,
  })
  resetPasswordRequest(
    @Body() recoverPassword: RecoverPasswordDto,
  ): Promise<void> {
    return this.authService.resetPasswordRequest(recoverPassword)
  }

  @Post('reset-password')
  @ApiResponse({
    status: 201,
    description: 'Password changed',
  })
  @ApiResponse({
    status: 400,
    description: `Token invalid`,
  })
  changePassword(@Body() recoverPassword: ChangePasswordDto): Promise<void> {
    return this.authService.resetPassword(recoverPassword)
  }
}
