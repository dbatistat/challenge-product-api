import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { UserService } from './user.service'
import { PublicUser } from './user.interfaces'

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<PublicUser> {
    const { password, recoverPassword, ...rest } =
      await this.userService.getById(id)

    return rest
  }
}
