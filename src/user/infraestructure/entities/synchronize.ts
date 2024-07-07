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
import { OrmBlogCommentMapper } from "src/comment/infraestructure/mapper/blog/orm-comment-blog.mapper";
import { OrmLessonCommentRepository } from "src/comment/infraestructure/repositories/lesson/orm-comment.repository";
import { OrmLessonCommentMapper } from "src/comment/infraestructure/mapper/lesson/orm-comment-lesson.mapper";
import { Injectable } from "@nestjs/common";
import { OrmTagRepository } from "src/tag/infraestructure/repositories/orm-tag-repository";

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

    private readonly lessonCommentRepository = new OrmLessonCommentRepository(
        new OrmLessonCommentMapper(),
        PgDatabaseSingleton.getInstance()
    );

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

            let usersOdm = [];
            for (const user of users) {
                const userOdm = await this.userModel.findOne({id: user.id});
                usersOdm.push(userOdm._id);
            }  
            await this.trainerModel.create({followers: usersOdm, id, location, name})
        }
        console.log('trainers terminados')

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
            const odmCategory = await this.categoryModel.findOne({id: category.id});
            const odmTrainer = await this.trainerModel.findOne({id: trainer.id});
            let tagsOdm = [];

            for (const tag of tags) {
                const tagOdm = await this.tagModel.findOne({id: tag.id});
                tagsOdm.push(tagOdm._id);
            }

            let imagesOdm = [];
            for (const image of images) {
                const imageOdm = await this.imageModel.findOne({id: image.id});
                imagesOdm.push(imageOdm._id);
            }
            await this.blogModel.create({id, category: odmCategory._id, description, publication_date, tags: tagsOdm, title, trainer: odmTrainer._id, images: imagesOdm});
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

            let tagsOdm = [];

            for (const tag of tags) {
                const tagOdm = await this.tagModel.findOne({id: tag.id});
                tagsOdm.push(tagOdm._id);
            }

            let lessonsOdm = [];
            for (const lesson of lessons) {
                const lessonOdm = await this.lessonModel.findOne({id: lesson.id});
                lessonsOdm.push(lessonOdm._id);
            }
            await this.courseModel.create({category: odmCategory._id, description, id, image, lessons: lessonsOdm, level, minutes, publication_date, tags: tagsOdm, name, trainer: odmTrainer._id, weeks});
        }
        console.log('courses terminados')

        const allProgress = await this.progressRepository.find();
        for (const progress of allProgress) {
            const {lastTime, lesson_id, markAsCompleted, time, user_id} = progress
            const odmUser = await this.userModel.findOne({id: user_id});
            const odmLesson = await this.lessonModel.findOne({id: lesson_id});
            await this.progressModel.create({lastTime, lesson: odmLesson._id, markAsCompleted, time, user: odmUser._id})
        }
        console.log('progress terminados')

        const blogComments = await this.blogCommentRepository.find();
        for (const comment of blogComments) {
            const {id, blog_id, user_id, body, publication_date, userDisliked, userLiked} = comment;
            const odmUser = await this.userModel.findOne({id: user_id});
            const odmBlog = await this.blogModel.findOne({id: blog_id});
            await this.blogCommentModel.create({blog: odmBlog._id, body, id, publication_date, user: odmUser._id, userDisliked, userLiked});
        }
        console.log('blogComments terminado');

        const lessonComments = await this.lessonCommentRepository.find();
        for (const comment of lessonComments) {
            const {id, lesson_id, user_id, body, publication_date, userDisliked, userLiked} = comment;
            const odmUser = await this.userModel.findOne({id: user_id});
            const odmLesson = await this.lessonModel.findOne({id: lesson_id});
            await this.lessonCommentModel.create({lesson: odmLesson._id, body, id, publication_date, user: odmUser._id, userDisliked, userLiked});
        }
        console.log('lessonComments terminado');
    }
}