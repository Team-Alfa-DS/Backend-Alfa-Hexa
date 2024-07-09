
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

interface BlogFromODM {
    id: string;
    name: string;
    content: string;
    date: Date;
    trainer: string;
    category:string;
    tag_id: string,
    images: string[],
    comments: string[]

    
}

export class OdmBlogMapper {
    static toDomain(blog: BlogFromODM): Blog {
        console.log(blog.tag_id)
        return new Blog(
            BlogId.create(blog.id),
            BlogTitle.create(blog.name),
            BlogContent.create(blog.content),
            BlogPublicationDate.create(blog.date),
            blog.comments.map((comment) => BlogCommentId.create(comment)),
            CategoryId.create(blog.category),
            TrainerId.create(blog.trainer),
            BlogTag.create(blog.tag_id),
            blog.images.map((image) => BlogImage.create(image))

        );
    }

    static toPersistence(blog: Blog): BlogFromODM {
        return {
            id: blog.Id.value,
            name: blog.Title.value,
            content: blog.Content.value,
            date: blog.Publication_date.value,
            trainer: blog.Trainer.trainerId,
            category: blog.Category.value,
            tag_id: blog.Tag.value,
            images: blog.Images.map((image) => image.value),
            comments: blog.Comments.map((comment) => comment.commentId)
        };
    }
    
}
