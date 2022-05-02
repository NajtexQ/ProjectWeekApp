import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { LikeController } from './like.controller';
import { Like } from './like.entity';
import { LikeService } from './like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    CommonModule
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService]
})
export class LikeModule {}
