import { IService } from "src/common/application/interfaces/IService";
import { GetBlogsCountDTO } from "./interfaces/getBlogsCountDTO";
import { GetBlogsCountResponseDTO } from "./interfaces/getBlogsCountResponseDTO.interface";
import { IBlogRepository } from "../domain/repositories/IBlog.repository";
import { Result } from "src/common/domain/result-handler/result";

export class GetBlogsCountService implements IService<GetBlogsCountDTO, GetBlogsCountResponseDTO> {
    constructor(private readonly blogRepository: IBlogRepository) {}
    get name(): string {
        return this.constructor.name;
    }

    async execute(request: GetBlogsCountDTO): Promise<Result<GetBlogsCountResponseDTO>> {
        try {
            const blogsCount = await this.blogRepository.getBlogsCount(request.category, request.trainer);
            return Result.success(new GetBlogsCountResponseDTO(blogsCount.Value));
        } catch (error) {
            return Result.fail(error);
        }
    }
}