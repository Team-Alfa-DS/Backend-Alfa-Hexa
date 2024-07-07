import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from 'src/user/domain/enums/role-user.type';
import { OrmProgressEntity } from 'src/progress/infraestructure/entities/orm-entities/orm-progress.entity';
import { OrmTrainerEntity } from 'src/trainer/infraestructure/entities/orm-entities/orm-trainer.entity';
import { NotifyEntity } from 'src/notify/notify/Infraestructure/entities/notify.entity';
import { OrmBlogCommentEntity } from 'src/comment/infraestructure/entities/orm-entities/orm-comment.blog.entity';
import { OrmLessonCommentEntity } from 'src/comment/infraestructure/entities/orm-entities/orm-comment.lesson.entity';

@Entity('user')
export class OrmUserEntity {

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
  image?: string;

  @OneToMany(() => OrmBlogCommentEntity, (comment) => comment.user)
  blogComments: OrmBlogCommentEntity[];

  @OneToMany(() => OrmLessonCommentEntity, (comment) => comment.user)
  lessonComments: OrmLessonCommentEntity[];

  @OneToMany(() => OrmProgressEntity, (progress) => progress.user)
  progress: OrmProgressEntity[];

  @ManyToMany(() => OrmTrainerEntity, (OrmTrainerEntity) => OrmTrainerEntity.users)
  trainers: OrmTrainerEntity[];

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
    const user = new OrmUserEntity();
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