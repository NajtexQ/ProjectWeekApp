import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NonUser } from './non-users.entity';
import { AuthUser } from './auth.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([NonUser, AuthUser]),
    UserModule,
    CommonModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {
}
