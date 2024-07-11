/* eslint-disable prettier/prettier */

import { Category } from "src/category/domain/Category";
import { ICategoryCommandRepository } from "src/category/domain/repositories/category-repository.interface";
import { IService } from "src/common/application/interfaces/IService";
import { Result } from "src/common/domain/result-handler/result";
import { GetCategoryRequest } from "../dtos/request/get-category.request";
import { GetCategoryResponse } from "../dtos/response/get-category.response";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { ICategoryQueryRepository } from "src/category/domain/repositories/ICategoryQuery.repository";

export class GetCategoryByIdService extends IService<GetCategoryRequest, GetCategoryResponse>{
    OrmCategoryRepository: any;
    constructor (private readonly categoryRepository: ICategoryQueryRepository){super()}
    
    async execute(value: GetCategoryRequest): Promise<Result<GetCategoryResponse>>{
        try {
            const result = await this.categoryRepository.getCategoryById(CategoryId.create(value.categoryId));
            if (!result.isSuccess) return Result.fail(result.Error);

            const response = new GetCategoryResponse(result.Value.Icon.value, result.Value.Id.value, result.Value.Name.value);
            return Result.success(response);
        } catch (error) {
            return Result.fail(error);
        }
    }
}