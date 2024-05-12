import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  @Get()
  hello(): string {
    return 'hello'
  }
}
