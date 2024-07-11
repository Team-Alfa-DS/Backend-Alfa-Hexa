import { IService } from "src/common/application/interfaces/IService";
import { CreateCategoryRequest } from "../dtos/request/create-category.request";
import { CreateCategoryResponse } from "../dtos/response/create-category.response";
import { Result } from "src/common/domain/result-handler/result";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { Model } from "mongoose";
import { ICategoryCommandRepository } from "src/category/domain/repositories/category-repository.interface";
import { CategoryName } from "src/category/domain/valueObjects/categoryName";
import { CategoryNotFoundException } from "src/category/domain/exceptions/category-not-found-exception";
import { CategoryAlreadyExistException } from "src/category/domain/exceptions/category-already-exist-exception";
import { IFileUploader } from "src/common/application/file-uploader/file-uploader.interface";
import { TypeFile } from "src/common/application/file-uploader/enums/type-file.enum";
import { Category } from "src/category/domain/Category";
import { CategoryId } from "src/category/domain/valueObjects/categoryId";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { CategoryIcon } from "src/category/domain/valueObjects/categoryIcon";
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";
import { ICategoryQueryRepository } from "src/category/domain/repositories/ICategoryQuery.repository";

export class CreateCategoryService extends IService<CreateCategoryRequest, CreateCategoryResponse> {

    private readonly odmCategoryRepository: ICategoryQueryRepository;
    private readonly ormCategoryRepository: ICategoryCommandRepository;
    private readonly fileUploader: IFileUploader;
    private readonly genId: IIdGen;
    private readonly eventPublisher: IEventPublisher;

    constructor(odmCategoryRepository: ICategoryQueryRepository, ormCategoryRepository: ICategoryCommandRepository, fileUploader: IFileUploader, genId: IIdGen, eventPublisher: IEventPublisher) {
        super();
        this.odmCategoryRepository = odmCategoryRepository;
        this.ormCategoryRepository = ormCategoryRepository;
        this.fileUploader = fileUploader;
        this.genId = genId;
        this.eventPublisher = eventPublisher;
    }

    async execute(Value: CreateCategoryRequest): Promise<Result<CreateCategoryResponse>> {
        try {
            const category = await this.odmCategoryRepository.getCategoryByName(CategoryName.create(Value.name));
            if (category) throw new CategoryAlreadyExistException(`Ya existe la categoria ${Value.name}`);
            const image = await this.fileUploader.uploadFile(Value.icon, TypeFile.image);
            if (!image.isSuccess) return Result.fail(image.Error);
            const categoryDomain = Category.create(
                CategoryId.create(await this.genId.genId()),
                CategoryName.create(Value.name),
                CategoryIcon.create(image.Value)
            );
            await this.ormCategoryRepository.saveCategory(categoryDomain);
            categoryDomain.Register();
            this.eventPublisher.publish(categoryDomain.pullDomainEvents());
            const response = new CreateCategoryResponse();
            return Result.success(response);

        } catch(err) {
            return Result.fail(err);
        }
    }
    
}