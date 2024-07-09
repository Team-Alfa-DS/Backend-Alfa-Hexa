import { Blog } from "src/blog/domain/Blog";
import { BlogContent } from "src/blog/domain/valueObjects/blogContent";
import { BlogId } from "src/blog/domain/valueObjects/blogId";
import { BlogImage } from "src/blog/domain/valueObjects/blogImage";
import { BlogPublicationDate } from "src/blog/domain/valueObjects/blogPublicationDate";
import { BlogTag } from "src/blog/domain/valueObjects/blogTag";
import { BlogTitle } from "src/blog/domain/valueObjects/blogTitle";
import { Category } from "src/category/domain/Category";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";
import { CommentBlogUserId } from "src/comment/domain/valueObjects/blog/comment-blog-userId";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";

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
            BlogTag.create(blog.tags[0].name),
            blog.images.map((image: Image) => BlogImage.create(image.url))

        );
    }
    
}
