/* eslint-disable prettier/prettier */

import { Category } from "src/category/domain/Category";
import { ICategoryRepository } from "src/category/domain/repositories/category-repository.interface";
import { IService } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { GetCategoryRequest } from "../dtos/request/get-category.request";
import { GetCategoryResponse } from "../dtos/response/get-category.response";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";

export class GetCategoryByIdService extends IService<GetCategoryRequest, GetCategoryResponse>{
    OrmCategoryRepository: any;
    constructor (private readonly categoryRepository: ICategoryRepository){super()}
    
    async execute(value: GetCategoryRequest): Promise<Result<GetCategoryResponse>>{
        const result = await this.categoryRepository.getCategoryById(CategoryId.create(value.categoryId));
        if (!result.isSuccess) return Result.fail(result.Error, result.StatusCode, result.Message);

        const response = new GetCategoryResponse(result.Value.icon, result.Value.id, result.Value.name);
        return Result.success(response, 200);
    }
}