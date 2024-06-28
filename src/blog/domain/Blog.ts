
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
    public id: string,
    public title: string,
    public content: string,
    public publication_date: Date,
    public comments: string[],              
    public category: string,
    public trainer: string, 
    public tags: Tag[],
    public images: Image[],
){}
    
}