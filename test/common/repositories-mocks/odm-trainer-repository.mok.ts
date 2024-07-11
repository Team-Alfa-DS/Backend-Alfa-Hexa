import { BlogId } from "src/blog/domain/valueObjects/blogId";
import { OdmBlogEntity } from "src/blog/infraestructure/entities/odm-entities/odm-blog.entity";
import { Result } from "src/common/domain/result-handler/result";
import { CourseId } from "src/course/domain/value-objects/course-id";
import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";
import { IOdmTrainerRepository } from "src/trainer/domain/repositories/odm-trainer-repository.interface";
import { Trainer } from "src/trainer/domain/trainer";
import { TrainerBlogId } from "src/trainer/domain/valueObjects/trainer-blogid";
import { TrainerCourseId } from "src/trainer/domain/valueObjects/trainer-courseid";
import { TrainerFollower } from "src/trainer/domain/valueObjects/trainer-followers";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { TrainerLocation } from "src/trainer/domain/valueObjects/trainer-location";
import { TrainerName } from "src/trainer/domain/valueObjects/trainer-name";
import { TrainerFollowerUserId } from "src/trainer/domain/valueObjects/trainer-userid";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { UserRole } from "src/user/domain/enums/role-user.type";
import { UserId } from "src/user/domain/value-objects/user-id";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";


export class OdmTrainerRepositoryMock implements IOdmTrainerRepository {
    
    
    private trainers: Trainer[] = [];
    private readonly trainerOdm: OdmTrainerEntity[] = [
        {
        id: 'dc20a55c-791a-434d-9791-c0e119251968',
        location: 'placeholder',
        name: 'Roman Peterson',
        followers: [{
            id: '244fbecc-2127-433d-ba76-762fb2fee1c8', 
            email: 'dbcd@gmail.com', 
            name: 'Daniel Bortot',
            password: '12345',
            phone: '12345678910',
            type: UserRole.CLIENT,
            image: null
        }]
        }
    ]

    private readonly coursesOdm: OdmCourseEntity[] = [
        {
            id: '4a370052-3c3d-4a18-9ba1-a9fd5336a145',
            description: 'una descripcion',
            image: 'https://res.cloudinary.com/dhrnlh0kg/image/upload/v1718305862/dy0o7ppdrquv4rjtkyn8.jpg',
            level: 'Principiante',
            minutes: 30,
            name: 'Yoga para Principiantes',
            publication_date: new Date(),
            weeks: 1,
            category: {
                id: 'ca701b5b-0e6b-41a8-99d5-c1faeef6d5cf',
                icon: 'https://www.placeholder.com',
                name: 'Yoga'
            },
            lessons: [{
                id: '62d3f486-3563-4525-acc4-4c0b22998c65',
                content: 'Contenido',
                seconds: 300,
                title: 'leccion 1',
                video: 'https://res.cloudinary.com/dhrnlh0kg/video/upload/v1718306045/lfc9awszmicb9k02uzkd.mp4'
            }],
            trainer: {
                id: 'dc20a55c-791a-434d-9791-c0e119251968',
                location: 'placeholder',
                name: 'Roman Peterson',
                followers: []
            },
            tags: []
        }
    ]
    
    private readonly blogs: OdmBlogEntity[] = [
        {
            id: '17ae64e6-6ac4-4ca9-9272-9726578b83cf',
            title: 'Postura Fácil',
            description: `Postura con la que podemos comenzar la práctica de yoga. 
            La columna se alarga mientras los hombros se relajan y la barbilla queda paralela al suelo. 
	        Debemos intentar sentarnos sobre los isquiones y cruzar las piernas 
            sin que la incomodidad de la postura impida que os concentréis 
            en la respiración y en vuestro cuerpo.`,
            publication_date: new Date(),
            category: {
                id: 'ca701b5b-0e6b-41a8-99d5-c1faeef6d5cf',
                name: 'Yoga',
                icon: `https://www.placeholder.com`
            },
            tags: [{
                id: '244fbecc-2127-433d-ba76-762fb2fee1c8',
                name: 'Tag 1'
            }, {
                id: '244fbecc-2127-433d-ba76-762fb2fee1c8',
                name: 'Tag 2'
            }],
            trainer:{
                id: 'dc20a55c-791a-434d-9791-c0e119251968',
                name: 'Daniel Bortot',
                location: 'Tucupita',
                followers: []
            },
            images: [{
                id: '238c26b0-c7c9-41da-b87d-8cb1c68534a7',
                url: 'https://res.cloudinary.com/dhrnlh0kg/image/upload/v1718329225/x7hxeol9ao0ucupkyntt.webp'
            },
            {
                id: '42806752-257f-4baf-ba37-31fdc727001b',
                url: 'https://res.cloudinary.com/dhrnlh0kg/image/upload/v1718329239/f6t5mxfabpzwriotmrbx.jpg'
            }]
        },
        {
            id: '59cfa2fa-6802-4ee7-9a6a-cfed60e71818',
            title: 'Postura de la media luna',
            description: `La postura de la media luna tiene muchos beneficios, 
            ya que es una postura de equilibrio y un asana de apertura de cadera.`,
            publication_date: new Date(),
            category: {
                id: '675495bb-8f05-4171-8140-7f9e75e8b2d8',
                name: 'Estiramiento',
                icon: `https://www.placeholder.com`
            },
            tags: [{
                id: '244fbecc-2127-433d-ba76-762fb2fee1c8',
                name: 'Tag 1'
            }, {
                id: '244fbecc-2127-433d-ba76-762fb2fee1c8',
                name: 'Tag 2'
            }],
            trainer:{
                id: 'dc20a55c-791a-434d-9791-c0e119251968',
                name: 'Daniel Bortot',
                location: 'Venezuela',
                followers: []
            },
            images: [{
                id: '238c26b0-c7c9-41da-b87d-8cb1c68534a7',
                url: 'https://res.cloudinary.com/dhrnlh0kg/image/upload/v1718329225/x7hxeol9ao0ucupkyntt.webp'
            },
            {
                id: '42806752-257f-4baf-ba37-31fdc727001b',
                url: 'https://res.cloudinary.com/dhrnlh0kg/image/upload/v1718329239/f6t5mxfabpzwriotmrbx.jpg'
            }]
        }
    ];

    private readonly odmUsers: OdmUserEntity[] = [
        {
            id: '244fbecc-2127-433d-ba76-762fb2fee1c8', 
            email: 'dbcd@gmail.com', 
            name: 'Daniel Bortot',
            password: '12345',
            phone: '12345678910',
            type: UserRole.CLIENT,
            image: null
        }
    ];
    
    async findTrainerById(id: TrainerId): Promise<Result<Trainer>> {
        const trainer = this.trainerOdm.find((t) => t.id === id.trainerId);

        let followers = trainer.followers.length;

        let coursesId = this.coursesOdm.map(
            (c) => TrainerCourseId.create(new CourseId(c.id)));

        let user = this.odmUsers.map(
            (u) => TrainerFollowerUserId.create(UserId.create(u.id))
        )

        let blogs = this.blogs.map(
            (b) => TrainerBlogId.create(BlogId.create(b.id))
        );

        let train = Trainer.create(
            TrainerId.create(trainer.id),
            TrainerName.create(trainer.name),
            TrainerFollower.create(followers),
            TrainerLocation.create(trainer.location),
            coursesId, 
            blogs, 
            user 
        );

        return Result.success(train) ;
    }


    findTrainerByName(name: TrainerName): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    followTrainer(trainer: Trainer): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findFollowByUserId(trainerId: TrainerId, userId: TrainerFollowerUserId): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    countFollows(userId: UserId): Promise<Result<number>> {
        throw new Error("Method not implemented.");
    }

    async findAllTrainers(userfollow?: boolean, user?: string, page?: number, perpage?: number): Promise<Result<Trainer[]>> {
        const trainer = this.trainerOdm

        let response = []
        for (let t of trainer){
        
            let followers = t.followers.length;

        let coursesId = this.coursesOdm.map(
            (c) => TrainerCourseId.create(new CourseId(c.id)));

        let user = this.odmUsers.map(
            (u) => TrainerFollowerUserId.create(UserId.create(u.id))
        )

        let blogs = this.blogs.map(
            (b) => TrainerBlogId.create(BlogId.create(b.id))
        );

        let train = Trainer.create(
            TrainerId.create(t.id),
            TrainerName.create(t.name),
            TrainerFollower.create(followers),
            TrainerLocation.create(t.location),
            coursesId, 
            blogs, 
            user 
        );
            response.push(train);
        }

        return Result.success(response);
    }

    async countnotreaded(): Promise<Result<number>> {
        return Result.success(0);
    }

    async saveTrainer(trainer: Trainer): Promise<void> {
        this.trainers.push(trainer);
    }
}