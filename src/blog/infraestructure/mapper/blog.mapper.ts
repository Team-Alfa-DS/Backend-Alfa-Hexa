import { Blog } from "src/blog/domain/Blog";
import { BlogContent } from "src/blog/domain/valueObjects/blogContent";
import { BlogId } from "src/blog/domain/valueObjects/blogId";
import { BlogImage } from "src/blog/domain/valueObjects/blogImage";
import { BlogPublicationDate } from "src/blog/domain/valueObjects/blogPublicationDate";
import { BlogTag } from "src/blog/domain/valueObjects/blogTag";
import { BlogTitle } from "src/blog/domain/valueObjects/blogTitle";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { OrmBlogEntity } from "../entities/orm-entities/orm-blog.entity";
import { OrmCategoryMapper } from "src/category/infraestructure/mapper/orm-category.mapper";
import { OrmTrainerMapper } from "src/trainer/infraestructure/mapper/orm-trainer.mapper";

interface Tag {
    id: string;
    name: string;
}

interface Image {
    id: string;
    url: string;
}

interface Comment {
    id: string;
}


interface BlogFromORM {
    id: string;
    title: string;
    description: string;
    publication_date: Date;
    trainer:{
        id: string;
        name: string;
        followers?: number;
        userFollow?: boolean;
        location?: string;
    },
    category:{
        id: string;
        name: string;
        icon: string;
    },
    tags: Tag[],
    
    images: Image[],
    
    comments: Comment[]

    
}

export class BlogMapper {
    static toDomain(blog: BlogFromORM): Blog {
        return new Blog(
            BlogId.create(blog.id),
            BlogTitle.create(blog.title),
            BlogContent.create(blog.description),
            BlogPublicationDate.create(blog.publication_date),
            blog.comments.map((comment: Comment) => BlogCommentId.create(comment.id)),
            CategoryId.create(blog.category.id),
            TrainerId.create(blog.trainer.id),
            blog.tags.map((tag: Tag) => BlogTag.create(tag.name)),
            blog.images.map((image: Image) => BlogImage.create(image.url))

        );
    }

    toPersistence(blog: Blog): OrmBlogEntity {
        let ormBlog = OrmBlogEntity.create(
            blog.Id.value,
            blog.Title.value,
            blog.Content.value,
            blog.Publication_date.value,
            blog.Category.value,
            blog.Trainer.trainerId,
            blog.Tag.value,
            blog.Images.map((image) => image.value),
            blog.Comments.map((comment) => comment.commentId)
        );
        return ormBlog;
    } 
    
}
