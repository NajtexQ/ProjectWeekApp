import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController]
})
export class AuthModule {
}
