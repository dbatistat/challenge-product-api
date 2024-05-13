import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { EmailModule } from './email/email.module'
import { ProductModule } from './product/product.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_URL,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    EmailModule,
    ProductModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
