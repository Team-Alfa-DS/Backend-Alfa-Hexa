import { CommentEntity } from "src/comment/infraestructure/entities/comment.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image.entity";
import { Tag } from "./tag.entity";
import { CategoryEntity } from "src/category/infraestructure/entities/category.entity";
import { OrmTrainer } from "src/trainer/infraestructure/entities/trainer.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('blog')
export class BlogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Titulo del Blog',
    example: 'Mejoramiento de la salud a traves de ejercicio'
  })
    @Column()
    title: string;

    @ApiProperty({
      description: 'Descripción del blog',
      example: 'En este blog encontraras toda la inforamcion necesario para hacer ejercicios que mejores la salud'
    })
    @Column()
    description: string;


    @ApiProperty({
      description: 'Fecha de publicación del blog',
      example: '03/04/2024'
    })
    @Column()
    publication_date: Date

    @OneToMany(() => CommentEntity, comment => comment.blog)
    comments: CommentEntity[];

    @OneToMany(() => Image, image => image.blog)
    images: Image[];

    @ManyToOne(() => CategoryEntity, category => category.blogs)
    @JoinColumn({name: 'category_id'})
    category: CategoryEntity;

  @ManyToOne(() => OrmTrainer, (trainer) => trainer.blogs)
  @JoinColumn({ name: 'trainer_id' })
  trainer: OrmTrainer;

  @ManyToMany(() => Tag, (tag) => tag.blogs)
  @JoinTable({ name: 'blog_tag' })
  tags: Tag[];
}
