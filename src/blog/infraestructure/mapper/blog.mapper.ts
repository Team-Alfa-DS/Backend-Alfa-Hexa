import { Blog } from "src/blog/domain/Blog";

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
            blog.id,
            blog.title,
            blog.description,
            blog.publication_date,
            blog.comments.map((comment: Comment) => comment.id),
            blog.category.id,
            blog.trainer.id,
            blog.tags,
            blog.images,
         
        );
    }
    
}
