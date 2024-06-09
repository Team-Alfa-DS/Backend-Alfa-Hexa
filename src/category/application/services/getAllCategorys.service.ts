/* eslint-disable prettier/prettier */
import { Category } from "src/category/domain/Category";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { IService } from "src/common/application/interfaces/IService";
import { GetAllCategoriesRequest } from "../dtos/request/get-all-categories.request";
import { GetAllCategoriesResponse } from "../dtos/response/get-all-categories.response";
import { Result } from "src/common/domain/result-handler/result";

export class GetAllCategorysService extends IService<GetAllCategoriesRequest, GetAllCategoriesResponse>{
    constructor (private readonly categoryRepository: ICategoryRepository){super()}
    
    async execute(value: GetAllCategoriesRequest): Promise<Result<GetAllCategoriesResponse>>{

        const result = await this.categoryRepository.getAllCategory(value.page, value.perpage);
        if (!result.isSuccess) return Result.fail(result.Error, result.StatusCode, result.Message);

        const response = new GetAllCategoriesResponse(result.Value);
        return Result.success(response, 200);
    }
}