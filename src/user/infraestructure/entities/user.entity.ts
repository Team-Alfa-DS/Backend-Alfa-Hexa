import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from 'src/comment/infraestructure/entities/comment.entity';
import { UserRole } from 'src/user/domain/enums/role-user.type';
import { ProgressEntity } from 'src/progress/infraestructure/entities/progress.entity';
import { OrmTrainer } from 'src/trainer/infraestructure/entities/trainer.entity';
import { NotifyEntity } from 'src/notify/notify/Infraestructure/entities/notify.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  type: UserRole;

  @Column('bytea', { nullable: true })
  image: string;

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => ProgressEntity, (progress) => progress.user)
  progress: ProgressEntity[];

  @ManyToMany(() => OrmTrainer, (OrmTrainer) => OrmTrainer.users)
  trainers: OrmTrainer[];

  @OneToMany(() => NotifyEntity, notify => notify.user)
  notify: NotifyEntity[];

  static create(
    id: string,
    email: string,
    name: string,
    phone: string,
    image?: string,
  ) {
    const user = new UserEntity();
    user.id = id;
    user.email = email;
    user.name = name;
    user.phone = phone;
    user.image = image;
    return user;
  }
}