import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrmImageEntity } from "./orm-image.entity";
import { OrmTagEntity } from "../../../../tag/infraestructure/entities/orm-entities/orm-tag.entity";
import { OrmCategoryEntity } from "src/category/infraestructure/entities/orm-entities/orm-category.entity";
import { OrmTrainerEntity } from "src/trainer/infraestructure/entities/orm-entities/orm-trainer.entity";
import { OrmBlogCommentEntity } from "src/comment/infraestructure/entities/orm-entities/orm-comment.blog.entity";

@Entity('blog')
export class OrmBlogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    publication_date: Date

    @OneToMany(() => OrmBlogCommentEntity, comment => comment.blog)
    comments: OrmBlogCommentEntity[];

    @OneToMany(() => OrmImageEntity, image => image.blog)
    images: OrmImageEntity[];

    @ManyToOne(() => OrmCategoryEntity, category => category.blogs)
    @JoinColumn({name: 'category_id'})
    category: OrmCategoryEntity;

  @ManyToOne(() => OrmTrainerEntity, (trainer) => trainer.blogs)
  @JoinColumn({ name: 'trainer_id' })
  trainer: OrmTrainerEntity;

  @ManyToMany(() => OrmTagEntity, (tag) => tag.blogs)
  @JoinTable({ name: 'blog_tag' })
  tags: OrmTagEntity[];
}
