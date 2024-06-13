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

  @ApiProperty({
    description: 'Id del usuario',
    example: '75645sd3424354dfsdf56'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ApiProperty({
    description: 'Correo del usuario',
    example: 'mrSanchez.27@gmail.com'
  })
  @Column()
  email: string;


  @ApiProperty({
    description: 'nombre del usuario',
    example: 'Miguel Sanchez'
  })
  @Column()
  name: string;


  @ApiProperty({
    description: 'Contraseña del usuario',
    example: '123456'
  })
  @Column()
  password: string;


  @ApiProperty({
    description: 'Telefono del usuario',
    example: '04243216958'
  })
  @Column()
  phone: string;


  @ApiProperty({
    description: 'Tipo de usuario',
    example: 'ADMIN'
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  type: UserRole;


  @ApiProperty({
    description: 'Imagen de perfil del usuario',
    example: 'url:'
  })
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