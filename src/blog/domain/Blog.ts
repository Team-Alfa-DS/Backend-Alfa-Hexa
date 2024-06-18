import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { BlogContent } from "./valueObjects/blogContent";
import { BlogId } from "./valueObjects/blogId";
import { BlogPublicationDate } from "./valueObjects/blogPublicationDate";
import { BlogTitle } from "./valueObjects/blogTitle";
import { BlogTag } from "./valueObjects/blogTag";
import { BlogImage } from "./valueObjects/blogImage";

interface Tag{
    id: string;
    name: string;
}

interface Image{
    id: string;
    url: string;
}


export class Blog {
constructor(
    public id: BlogId,
    public title: BlogTitle,
    public content: BlogContent,
    public publication_date: BlogPublicationDate,
    public comments: string[],              
    public category: CategoryId,
    public trainer: string, 
    public tags: BlogTag[],
    public images: BlogImage[],
){}
    
}