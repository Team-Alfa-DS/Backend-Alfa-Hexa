import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Progress } from './entities/progress.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Progress])]
})
export class UserModule {}
