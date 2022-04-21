import { BadRequestException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CommonModule } from 'src/common/common.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CommonModule,
    // Save as png or jpg
    MulterModule.register({
      dest: './files',
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
          return cb(new BadRequestException('Only .png or .jpg files are allowed'), false);
        }
        cb(null, true);
      },
    })
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
