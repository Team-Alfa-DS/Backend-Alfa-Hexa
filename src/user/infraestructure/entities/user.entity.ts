import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from 'src/comment/infraestructure/entities/comment.entity';
import { UserRole } from 'src/user/domain/enums/role-user.type';
import { ProgressEntity } from 'src/progress/infraestructure/entities/progress.entity';
import { OrmTrainer } from 'src/trainer/infraestructure/entities/trainer.entity';

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

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => ProgressEntity, (progress) => progress.user)
  progress: ProgressEntity[];

  @ManyToMany(() => OrmTrainer, (OrmTrainer) => OrmTrainer.users)
  trainers: OrmTrainer[];

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
