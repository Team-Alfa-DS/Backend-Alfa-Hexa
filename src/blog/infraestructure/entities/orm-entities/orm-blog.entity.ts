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

    @Column({ type: 'uuid'})
    category_id: string;

    @ManyToOne(() => OrmCategoryEntity, category => category.blogs)
    @JoinColumn({name: 'category_id'})
    category: OrmCategoryEntity;

    @Column({ type: "uuid"})
    trainer_id: string;

  @ManyToOne(() => OrmTrainerEntity, (trainer) => trainer.blogs)
  @JoinColumn({ name: 'trainer_id' })
  trainer: OrmTrainerEntity;

  @ManyToMany(() => OrmTagEntity, (tag) => tag.blogs)
  @JoinTable({ name: 'blog_tag' })
  tags: OrmTagEntity[];

static create(
  id: string, 
  title: string, 
  description: string, 
  publication_date: Date, 
  category: string, 
  trainer: string, 
  tags: string[], 
  images: string[], 
  comments: string[]
) {
    const blog = new OrmBlogEntity();    
    blog.id = id;
    blog.title = title;
    blog.description = description;
    blog.publication_date = publication_date;
    blog.category_id = category;
    blog.trainer_id = trainer;
    blog.tags = tags.map(tagId => {
      const tag = new OrmTagEntity();
      tag.id = tagId;
      return tag;
    });

    blog.images = images.map(imageId => {
      const image = new OrmImageEntity();
      image.id = imageId;
      return image;
    });

    blog.comments = comments.map(commentId => {
      const comment = new OrmBlogCommentEntity();
      comment.id = commentId;
      return comment;
    });
    
    return blog;
  }


}
