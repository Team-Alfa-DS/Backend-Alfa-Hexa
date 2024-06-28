import { ApiProperty } from "@nestjs/swagger";
import { BlogEntity } from "src/blog/infraestructure/entities/blog.entity";
import { CourseEntity } from "src/course/infraestructure/entities/course.entity";
import { UserEntity } from "src/user/infraestructure/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('trainer')
export class OrmTrainer {

  @ApiProperty({
    description: 'Id del entrenador',
    example: '75645sd3424354dfsdf56asdf23r4'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ApiProperty({
    description: 'nombre del entrenador',
    example: 'Ana Montilla'
  })
  @Column()
  name: string;


  @ApiProperty({
    description: 'Cantidad de seguidores que tiene el entrenador',
    example: '242'
  })
  @Column()
  followers?: number;


  @ApiProperty({
    description: 'seguidos del entrenador',
    example: '726'
  })
  @Column()
  userFollow?: boolean;

  @ApiProperty({
    description: 'Ubicacion del entrenador',
    example: 'placeholder'
  })
  @Column()
  location?: string;

  @OneToMany(() => BlogEntity, (blog) => blog.trainer)
  blogs: BlogEntity[];

  @OneToMany(() => CourseEntity, (course) => course.trainer)
  courses?: CourseEntity[];

  @ManyToMany(() => UserEntity, (UserEntity) => UserEntity.trainers, {
    cascade: true,
  })
  @JoinTable()
  users?: UserEntity[];

  static create(
    id: string,
    name: string,
    followers: number,
    userFollow: boolean,
    location: string,
  ): OrmTrainer {
    const trainer = new OrmTrainer();
    trainer.id = id;
    trainer.name = name;
    trainer.followers = followers;
    trainer.userFollow = userFollow;
    trainer.location = location;
    return trainer;
  }
}
