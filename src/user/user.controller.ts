import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { UserService } from './user.service'
import { ChangePassword } from './user.interfaces'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('change-password')
  async changePassword(
    @Request() req,
    @Body() changePassword: ChangePassword,
  ): Promise<void> {
    await this.userService.changePassword(req.user.userId, changePassword)
  }
}
