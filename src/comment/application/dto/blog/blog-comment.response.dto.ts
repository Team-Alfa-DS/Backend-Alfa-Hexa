

export class GetBlogCommentsServiceDto {

    blogId: string;

    pagination: {
        page: number,
        perPage: number
    };

    userId: string; //Token del ususario, pero por los momentos se utiliza el Id
    
}