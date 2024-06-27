import { IService } from "src/common/application/interfaces/IService";
import { SearchRequestDto } from "../dtos/request/search-request.dto";
import { Result } from "src/common/domain/result-handler/result";
import { ITransactionHandler } from "src/common/domain/transaction-handler/transaction-handler.interface";
import { SearchTagResponseDto } from "../dtos/response/search-tag-response.dto";
import { ITagRepository } from "src/tag/application/ITagRepository";


export class SearchTagService extends IService<SearchRequestDto, SearchTagResponseDto>{

    private readonly transactionHandler: ITransactionHandler;
    private readonly tagRepository: ITagRepository;
    constructor(
        tagRepository: ITagRepository,
        transactionHandler: ITransactionHandler
    ){
        super()
        this.transactionHandler = transactionHandler;
        this.tagRepository = tagRepository;
    }

    async execute(data: SearchRequestDto): Promise<Result<SearchTagResponseDto>> {
        let tagNames: string[] = [];
        
        let result = await this.tagRepository.getAllTags(this.transactionHandler);
        
        if (!result) return Result.fail(result.Error, result.StatusCode, result.Message); 
        
        tagNames = result.Value;

        if (data.perpage) {
            let page = data.page;
            if (!page) {page = 0}

            tagNames = tagNames.slice((page*data.perpage), (data.perpage) + (page*data.perpage));
        }

        const response = new SearchTagResponseDto(tagNames);
        return Result.success(response, 200);
    }
}