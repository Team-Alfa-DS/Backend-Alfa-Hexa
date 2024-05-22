import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProgressEntity } from './entities/progress.entity';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ProgressEntity])],
    controllers: [UserController]
})
export class UserModule {}
