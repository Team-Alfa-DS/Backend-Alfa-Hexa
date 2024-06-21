import { Tag } from "src/blog/infraestructure/entities/tag.entity";
import { CategoryEntity } from "src/category/infraestructure/entities/category.entity";
import { OrmTrainer } from "src/trainer/infraestructure/entities/trainer.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('course')
export class CourseEntity {

  @ApiProperty({
    description: 'Id del curso',
    example: 'jhg45sd3424354dfsdf56'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ApiProperty({
    description: 'nombre del curso',
    example: 'De cero a Master en Relajación'
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Descripcion de lo que ofrece el curso',
    example: 'En este curso aprenderas lo necesario para relajarte desde casa'
  })
  @Column()
  description: string;


  @ApiProperty({
    description: 'Fecha en que se publica el curso',
    example: '12/06/2024'
  })
  @Column()
  publication_date: Date;


  @ApiProperty({
    description: 'Tiempo de duración del curso en MIN',
    example: '8:52'
  })
  @Column()
  minutes: number;


  @ApiProperty({
    description: 'Semanas de duración del curso',
    example: '2'
  })
  @Column()
  weeks: number;


  @ApiProperty({
    description: 'Nivel del curso',
    example: '1'
  })
  @Column({ nullable: true })
  level: number;


  @ApiProperty({
    description: 'Imagen del curso',
    example: 'Url'
  })
  @Column()
  image: string;

  @OneToMany(() => LessonEntity, (lesson) => lesson.course)
  lessons: LessonEntity[];

  @ManyToOne(() => CategoryEntity, category => category.blogs)
  @JoinColumn({name: 'category_id'})
  category: CategoryEntity;

  @ManyToOne(() => OrmTrainer, (trainer) => trainer.blogs)
  @JoinColumn({ name: 'trainer_id' })
  trainer: OrmTrainer;

  @ManyToMany(() => Tag, (tag) => tag.courses)
  @JoinTable({ name: 'course_tag' })
  tags: Tag[];
}
