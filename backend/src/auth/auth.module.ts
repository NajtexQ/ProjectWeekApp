import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';


@Module({
  imports: [
    UserModule,
    CommonModule
  ],
  controllers: [AuthController]
})
export class AuthModule {
}
