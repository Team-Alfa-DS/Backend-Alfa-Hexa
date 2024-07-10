import { IMapper } from "src/common/application/mappers/mapper.interface";
import { Trainer } from "src/trainer/domain/trainer";
import { OdmTrainerEntity } from "../entities/odm-entities/odm-trainer.entity";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { TrainerName } from "src/trainer/domain/valueObjects/trainer-name";
import { TrainerFollower } from "src/trainer/domain/valueObjects/trainer-followers";
import { TrainerLocation } from "src/trainer/domain/valueObjects/trainer-location";
import { Model } from "mongoose";
import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";
import { TrainerCourseId } from "src/trainer/domain/valueObjects/trainer-courseid";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { Uuid } from "src/common/domain/value-objects/Uuid";
import { OdmBlogEntity } from "src/blog/infraestructure/entities/odm-entities/odm-blog.entity";
import { TrainerBlogId } from "src/trainer/domain/valueObjects/trainer-blogid";
import { BlogId } from "src/blog/domain/valueObjects/blogId";
import { TrainerFollowerUserId } from "src/trainer/domain/valueObjects/trainer-userid";
import { UserId } from "src/user/domain/value-objects/user-id";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";

export class OdmTrainerMapper implements IMapper<Trainer, OdmTrainerEntity> {
    
    private readonly courseModel: Model<OdmCourseEntity>;
    private readonly blogModel: Model<OdmBlogEntity>;
    private readonly userModel: Model<OdmUserEntity>;

    constructor(courseModel: Model<OdmCourseEntity>, blogModel: Model<OdmBlogEntity>, userModel: Model<OdmUserEntity>) {
        this.courseModel = courseModel;
        this.blogModel = blogModel;
        this.userModel = userModel;
    }

    async toPersistence(DomainEntity: Trainer): Promise<OdmTrainerEntity> {
        const users: OdmUserEntity[] = [];
        for (const user of DomainEntity.User) {
            const userFound = await this.userModel.findOne({id: user.trainerFollowerUserId.Id})
            if (userFound) users.push(userFound);
        }
        const trainerPersistence = OdmTrainerEntity.create(
            DomainEntity.Id.trainerId,
            DomainEntity.Name.trainerName,
            DomainEntity.Location.trainerLocation,
            users
        )
        return trainerPersistence;
    }

    async toDomain(odmEntity: OdmTrainerEntity): Promise<Trainer> {
        const courses = await this.courseModel.find({'trainer.id': odmEntity.id});
        const blogs = await this.blogModel.find({'trainer.id': odmEntity.id});
        const coursesId: TrainerCourseId[] = []
        for (const course of courses) {
            coursesId.push(TrainerCourseId.create(new CourseId(course.id)))
        }
        const blogsId: TrainerBlogId[] = [];
        for (const blog of blogs) {
            blogsId.push(TrainerBlogId.create(BlogId.create(blog.id)))
        }
        const usersId: TrainerFollowerUserId[] = [];
        for (const user of odmEntity.followers) {
            usersId.push(TrainerFollowerUserId.create(UserId.create(user.id)))
        }

        const trainerDomain = Trainer.create(
            TrainerId.create(odmEntity.id),
            TrainerName.create(odmEntity.name),
            TrainerFollower.create(odmEntity.followers.length),
            TrainerLocation.create(odmEntity.location),
            coursesId,
            blogsId,
            usersId
        )

        return trainerDomain;
    }

}