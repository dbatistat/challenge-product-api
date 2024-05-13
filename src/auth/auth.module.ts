import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'
import { EmailModule } from '../email/email.module'

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120m' },
    }),
    EmailModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
