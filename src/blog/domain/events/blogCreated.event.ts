import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { DomainEvent } from "src/common/domain/domain-event";
import { BlogContent } from "../valueObjects/blogContent";
import { BlogId } from "../valueObjects/blogId";
import { BlogImage } from "../valueObjects/blogImage";
import { BlogPublicationDate } from "../valueObjects/blogPublicationDate";
import { BlogTag } from "../valueObjects/blogTag";
import { BlogTitle } from "../valueObjects/blogTitle";

export class BlogCreated extends DomainEvent {
    protected constructor(
        public readonly id: BlogId,
        public readonly title: BlogTitle,
        public readonly content: BlogContent,
        public readonly publication_date: BlogPublicationDate,
        public readonly comments: string[],              
        public readonly category: CategoryId,
        public readonly trainer: string, 
        public readonly tags: BlogTag[],
        public readonly images: BlogImage[],
    ) {
        super();
    }

    static create(
        id: BlogId,
        title: BlogTitle,
        content: BlogContent,
        publication_date: BlogPublicationDate,
        comments: string[],              
        category: CategoryId,
        trainer: string, 
        tags: BlogTag[],
        images: BlogImage[],
    ): BlogCreated {
        return new BlogCreated(id, title, content, publication_date, comments, category, trainer, tags, images);
    }
}