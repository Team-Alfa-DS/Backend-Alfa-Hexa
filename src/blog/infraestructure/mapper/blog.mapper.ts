import { Blog } from "src/blog/domain/Blog";

interface BlogFromORM {
    id: string;
    title: string;
    description: string;
    publication_date: Date;
    trainer:{
        id: string;
        name: string;
        followers: number;
        userFollow: boolean;
        location: string;
    },
    category:{
        id: string;
        name: string;
        icon: string;
    },
    tags: {
        id: string;
        name: string;
        }[],
    images: {
        id: string;
        url: string;
    }[],
    comments: {
        id: string;
    }[]

    
}

export class BlogMapper {
    static toDomain(blog: BlogFromORM): Blog {
        return new Blog(
            blog.id,
            blog.title,
            blog.description,
            blog.publication_date,
            blog.comments.map((comment: any) => comment.id),
            blog.category.id,
            blog.trainer.id,
            blog.tags,
            blog.images,
         
        );
    }
    
}
