import { Model } from "mongoose";
import { OdmUserEntity } from "./odm-entities/odm-user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { OdmLessonEntity } from "src/course/infraestructure/entities/odm-entities/odm-lesson.entity";
import { OdmBlogEntity } from "src/blog/infraestructure/entities/odm-entities/odm-blog.entity";
import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";
import { OdmImageEntity } from "src/blog/infraestructure/entities/odm-entities/odm-image.entity";
import { OdmBlogCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.blog.entity";
import { OdmLessonCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.lesson.entity";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { OdmProgressEntity } from "src/progress/infraestructure/entities/odm-entities/odm-progress.entity";
import { OdmTagEntity } from "src/tag/infraestructure/entities/odm-entities/odm-tag.entity";
import { PgDatabaseSingleton } from "src/common/infraestructure/database/pg-database.singleton";
import { OrmAuditRepository } from "src/common/infraestructure/repository/orm-audit.repository";
import { OrmUserMapper } from "../mappers/orm-mappers/orm-user.mapper";
import { OrmUserRepository } from "../repositories/orm-user.repository";
import { OrmProgressRepository } from "src/progress/infraestructure/repositories/orm-progress.repository";
import { OrmProgressMapper } from "src/progress/infraestructure/mappers/orm-progress.mapper";
import { OrmCourseEntity } from "src/course/infraestructure/entities/orm-entities/orm-course.entity";
import { TOrmCourseRepository } from "src/course/infraestructure/repositories/TOrmCourse.repository";
import { OrmCategoryRepository } from "src/category/infraestructure/repositories/orm-category.repository";
import { OrmCategoryMapper } from "src/category/infraestructure/mapper/orm-category.mapper";
import { OrmTrainerRepository } from "src/trainer/infraestructure/repositories/orm-trainer.repositorie";
import { OrmTrainerMapper } from "src/trainer/infraestructure/mapper/orm-trainer.mapper";
import { OrmBlogRepository } from "src/blog/infraestructure/repositories/ormBlog.repository";
import { OrmBlogCommentRepository } from "src/comment/infraestructure/repositories/blog/orm-comment.repository";
import { Injectable } from "@nestjs/common";
import { OrmTagRepository } from "src/tag/infraestructure/repositories/orm-tag-repository";
import { OrmLessonCommentMapper } from "src/course/infraestructure/mappers/orm-mappers/orm-comment-lesson.mapper";
import { OrmBlogCommentMapper } from "src/blog/infraestructure/mapper/orm-comment-blog.mapper";
import { OrmLessonCommentRepository } from "src/comment/infraestructure/repositories/orm-comment.repository";

@Injectable()
export class Synchronize {

    private readonly userRepository = new OrmUserRepository(
        new OrmUserMapper(),
        PgDatabaseSingleton.getInstance()
    );

    private readonly progressRepository = new OrmProgressRepository(
        new OrmProgressMapper(),
        PgDatabaseSingleton.getInstance()
    );

    private readonly courseRepository = new TOrmCourseRepository(
        PgDatabaseSingleton.getInstance()
    );

    private readonly categoryRepository = new OrmCategoryRepository(
        new OrmCategoryMapper(),
        PgDatabaseSingleton.getInstance()
    );

    private readonly trainerRepository = new OrmTrainerRepository(
        new OrmTrainerMapper(),
        PgDatabaseSingleton.getInstance()
    );

    private readonly blogRepository = new OrmBlogRepository(
        PgDatabaseSingleton.getInstance()
    );

    private readonly blogCommentRepository = new OrmBlogCommentRepository(
        new OrmBlogCommentMapper(),
        PgDatabaseSingleton.getInstance()
    );

    // private readonly lessonCommentRepository = new OrmLessonCommentRepository(
    //     new OrmLessonCommentMapper(),
    //     PgDatabaseSingleton.getInstance()
    // );

    private readonly tagRepository = new OrmTagRepository(
        PgDatabaseSingleton.getInstance()
    );

    constructor(
        @InjectModel('user') private userModel: Model<OdmUserEntity>,
        @InjectModel('lesson') private lessonModel: Model<OdmLessonEntity>,
        @InjectModel('blog') private blogModel: Model<OdmBlogEntity>,
        @InjectModel('course') private courseModel: Model<OdmCourseEntity>,
        @InjectModel('image') private imageModel: Model<OdmImageEntity>,
        @InjectModel('blog_comment') private blogCommentModel: Model<OdmBlogCommentEntity>,
        @InjectModel('lesson_comment') private lessonCommentModel: Model<OdmLessonCommentEntity>,
        @InjectModel('category') private categoryModel: Model<OdmCategoryEntity>,
        @InjectModel('trainer') private trainerModel: Model<OdmTrainerEntity>,
        @InjectModel('progress') private progressModel: Model<OdmProgressEntity>,
        @InjectModel('tag') private tagModel: Model<OdmTagEntity>
    ) {}

    async execute(): Promise<void> {
        const users = await this.userRepository.find()
        for (const user of users) {
            const {id, email, name, password, phone, type, image} = user

            await this.userModel.create({id, email, image, name, password, phone, type})
        }
        console.log('users terminados')

        const categories = await this.categoryRepository.find();
        for (const category of categories) {
            const {id, icon, name} = category;
            await this.categoryModel.create({id, icon, name});
        }
        console.log('categories terminados')

        const trainers = await this.trainerRepository.find({relations: {users: true}});
        for (const trainer of trainers) {
            const {id, name, location, users} = trainer;

            let usersOdm: OdmUserEntity[] = [];
            for (const user of users) {
                usersOdm.push(await this.userModel.findOne({id: user.id}));
            }  
            await this.trainerModel.create({followers: usersOdm, id, location, name})
        }
        console.log('trainers terminados');

        const tags = await this.tagRepository.find();
        for (const tag of tags) {
            const {id, name} = tag;
            await this.tagModel.create({id, name});
        }
        console.log('tags terminados')

        const blogsImages = await this.blogRepository.find({relations: {images: true}})
        for (const blog of blogsImages) {
            for (const image of blog.images) {
                const {id, url} = image
                await this.imageModel.create({id, url})
            }
        }
        console.log('images terminados')

        const blogs = await this.blogRepository.find({relations: {tags: true, category: true, trainer: true, images: true}});
        for (const blog of blogs) {
            const {category, description, id, publication_date, trainer, title, tags, images} = blog;
            let tagsOdm: OdmTagEntity[] = [];

            for (const tag of tags) {
                tagsOdm.push(await this.tagModel.findOne({id: tag.id}));
            }

            let imagesOdm: OdmImageEntity[] = [];
            for (const image of images) {
                imagesOdm.push(await this.imageModel.findOne({id: image.id}));
            }

            const categoryOdm = await this.categoryModel.findOne({id: category.id});
            const trainerOdm = await this.trainerModel.findOne({id: trainer.id});
            await this.blogModel.create({id, category: categoryOdm, description, publication_date, tags: tagsOdm, title, trainer: trainerOdm, images: imagesOdm});
        }
        console.log('blogs terminados')

        const coursesLessons = await this.courseRepository.find({relations: {lessons: true}});
        for (const courses of coursesLessons) {
            for (const lesson of courses.lessons) {
                const {content, id, seconds, title, video} = lesson;
                await this.lessonModel.create({content, seconds, title, id, video});
            }
        }
        console.log('lessons terminados')

        const courses = await this.courseRepository.find({relations: {lessons: true, category: true, tags: true, trainer: true}});
        for (const course of courses) {
            const {category, description, id, image, lessons, level, minutes, name, publication_date, tags, trainer, weeks} = course;
            const odmCategory = await this.categoryModel.findOne({id: category.id});
            const odmTrainer = await this.trainerModel.findOne({id: trainer.id});

            let tagsOdm: OdmTagEntity[] = [];

            for (const tag of tags) {
                tagsOdm.push(await this.tagModel.findOne({id: tag.id}));
            }

            let lessonsOdm: OdmLessonEntity[] = [];
            for (const lesson of lessons) {
                lessonsOdm.push(await this.lessonModel.findOne({id: lesson.id}));
            }

            const categoryOdm = await this.categoryModel.findOne({id: category.id});
            const trainerOdm = await this.trainerModel.findOne({id: trainer.id});
            await this.courseModel.create({category: categoryOdm, description, id, image, lessons: lessonsOdm, level, minutes, publication_date, tags: tagsOdm, name, trainer: trainerOdm, weeks});
        }
        console.log('courses terminados')

        const allProgress = await this.progressRepository.find();
        for (const progress of allProgress) {
            const {lastTime, lesson_id, markAsCompleted, time, user_id} = progress
            const lesson = await this.lessonModel.findOne({id: lesson_id});
            const user = await this.userModel.findOne({id: user_id});
            await this.progressModel.create({lastTime, lesson, markAsCompleted, time, user})
        }
        console.log('progress terminados')

        const blogComments = await this.blogCommentRepository.find();
        for (const comment of blogComments) {
            const {id, blog_id, user_id, body, publication_date, userDisliked, userLiked} = comment;
            const blog = await this.blogModel.findOne({id: blog_id});
            const user = await this.userModel.findOne({id: user_id});
            await this.blogCommentModel.create({blog, body, id, publication_date, user, userDisliked, userLiked});
        }
        console.log('blogComments terminado');

        const commentCourses = await this.courseRepository.getAllCourses();
        for (let commentCourse of commentCourses) {
            for (let lessons of commentCourse.Lessons) {
                for (let comment of lessons.comments) {
                    const {Id, LessonId, UserId, Body, PublicationDate} = comment;
                    const lesson = await this.lessonModel.findOne({id: LessonId});
                    const user = await this.userModel.findOne({id: UserId});
                    await this.lessonCommentModel.create({lesson, Body, Id, PublicationDate, user});
                }
            }
        }
        console.log('lessonComments terminado');
    }
} 