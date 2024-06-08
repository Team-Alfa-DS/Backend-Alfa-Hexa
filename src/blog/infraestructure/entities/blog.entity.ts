import { Comment } from "src/comment/infraestructure/entities/comment.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image.entity";
import { Tag } from "./tag.entity";
import { CategoryEntity } from "src/category/infraestructure/entities/category.entity";
import { OrmTrainer } from "src/trainer/infraestructure/entities/trainer.entity";

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  publication_date: Date;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];

  @OneToMany(() => Image, (image) => image.blog)
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
