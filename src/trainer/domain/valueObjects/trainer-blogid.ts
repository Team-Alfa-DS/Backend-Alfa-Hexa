import { ValueObject } from "src/common/domain/value-object";
import { EmptyTrainerBlogIdException } from "../exceptions/empty-trainer-blogid-trainer";
import { BlogId } from "src/blog/domain/valueObjects/blogId";

export class TrainerBlogId extends ValueObject<TrainerBlogId>{
    private readonly blogId: BlogId[];

    private constructor(blogId: BlogId[]) {
        
        if (!blogId) throw new EmptyTrainerBlogIdException("El id de blog no existe");
        super();
        this.blogId = blogId //*Esto funciona para que no pueda ser modificado
    }

    get trainerBlogId(): BlogId[] {
        return this.blogId;
    }

    equals(obj: TrainerBlogId): boolean {
        return this.blogId === obj.blogId;
    }
    public static create(blogid: BlogId[]): TrainerBlogId {
        return new TrainerBlogId(blogid);
    }
}