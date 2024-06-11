import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Image } from './entities/image.entity';
import { Tag } from './entities/tag.entity';
import { BlogController } from './controllers/blog.controller';


@Module({
    imports: [TypeOrmModule.forFeature([BlogEntity, Image, Tag])]
    ,controllers: [BlogController]

})
export class BlogModule {}
