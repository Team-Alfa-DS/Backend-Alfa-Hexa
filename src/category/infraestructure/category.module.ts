/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../domain/Category';
//import { Category } from './entities/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category])]
})
export class CategoryModule {}
