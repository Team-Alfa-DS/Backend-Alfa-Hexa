import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from 'src/user/domain/enums/role-user.type';
import { ProgressEntity } from 'src/progress/infraestructure/entities/progress.entity';
import { OrmTrainer } from 'src/trainer/infraestructure/entities/trainer.entity';
import { NotifyEntity } from 'src/notify/notify/Infraestructure/entities/notify.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BlogCommentEntity } from 'src/comment/infraestructure/entities/blog/comment.blog.entity';
import { LessonCommentEntity } from 'src/comment/infraestructure/entities/lesson/comment.lesson.entity';

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

  @OneToMany(() => BlogCommentEntity, (comment) => comment.user)
  blogComments: BlogCommentEntity[];

  @OneToMany(() => LessonCommentEntity, (comment) => comment.user)
  lessonComments: LessonCommentEntity[];

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
    password: string,
    phone: string,
    type: UserRole,
    image?: string,
  ) {
    const user = new UserEntity();
    user.id = id;
    user.email = email;
    user.name = name;
    user.password = password;
    user.phone = phone;
    user.type = type;
    user.image = image;
    return user;
  }
}