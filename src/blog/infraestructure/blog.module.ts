import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Image } from './entities/image.entity';
import { Tag } from './entities/tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Blog, Image, Tag])]
})
export class BlogModule {}
