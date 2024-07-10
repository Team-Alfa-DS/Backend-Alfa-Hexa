import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog } from "src/blog/domain/Blog";
import { IBlogRepository } from "src/blog/domain/repositories/IBlog.repository";
import { BlogId } from "src/blog/domain/valueObjects/blogId";
import { OdmBlogEntity } from "src/blog/infraestructure/entities/odm-entities/odm-blog.entity";
import { OdmBlogCommentMapper } from "src/blog/infraestructure/mapper/odm-comment-blog.mapper";
import { OdmCategoryEntity } from "src/category/infraestructure/entities/odm-entities/odm-category.entity";
import { CommentBlog } from "src/comment/domain/comment-blog";
import { BlogCommentBlogId } from "src/comment/domain/valueObjects/blog/comment-blog-blogId";
import { CommentBlogBody } from "src/comment/domain/valueObjects/blog/comment-blog-body";
import { BlogCommentId } from "src/comment/domain/valueObjects/blog/comment-blog-id";
import { CommentBlogPublicationDate } from "src/comment/domain/valueObjects/blog/comment-blog-publicationDate";
import { CommentBlogUserId } from "src/comment/domain/valueObjects/blog/comment-blog-userId";
import { OdmBlogCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.blog.entity";
import { OdmLessonCommentEntity } from "src/comment/infraestructure/entities/odm-entities/odm-comment.lesson.entity";
import { Result } from "src/common/domain/result-handler/result";
import { OdmCourseEntity } from "src/course/infraestructure/entities/odm-entities/odm-course.entity";
import { OdmLessonEntity } from "src/course/infraestructure/entities/odm-entities/odm-lesson.entity";
import { OdmTagEntity } from "src/tag/infraestructure/entities/odm-entities/odm-tag.entity";
import { OdmTrainerEntity } from "src/trainer/infraestructure/entities/odm-entities/odm-trainer.entity";
import { UserRole } from "src/user/domain/enums/role-user.type";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";


export class OdmBlogRepositoryMock implements IBlogRepository{
    

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



    private readonly odmComments: OdmBlogCommentEntity[] = [{
        id: `a13d98ec-31b2-4f47-b40a-731b4b4c4c77`,
        publication_date: new Date(),
        userLiked: false,
        userDisliked: false,
        body: `Excelente postura, la recomiendo`,
        blog: {
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
        },
        user: {
            id: '244fbecc-2127-433d-ba76-762fb2fee1c8', 
            email: 'dbcd@gmail.com', 
            name: 'Daniel Bortot',
            password: '12345',
            phone: '12345678910',
            type: UserRole.CLIENT,
            image: null
        }
    },
    {
        id: `a13d98ec-31b2-4f47-b40a-731b4b4c4c78`,
        publication_date: new Date(),
        userLiked: false,
        userDisliked: false,
        body: `Temia de la media luna, pero con esta explicación me siento más seguro de hacerla`,
        blog: {
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
        },
        user: {
            id: '244fbecc-2127-433d-ba76-762fb2fee1c8', 
            email: 'dbcd@gmail.com', 
            name: 'Daniel Bortot',
            password: '12345',
            phone: '12345678910',
            type: UserRole.CLIENT,
            image: null
        }
    },
    {
        id: `a13d98ec-31b2-4f47-b40a-731b4b4c4c79`,
        publication_date: new Date(),
        userLiked: false,
        userDisliked: false,
        body: `Si es verdad! Es una postura que ayuda a la apertura de cadera`,
        blog: {
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
        user: {
            id: '244fbecc-2127-433d-ba76-762fb2fee1c8', 
            email: 'dbcd@gmail.com', 
            name: 'Daniel Bortot',
            password: '12345',
            phone: '12345678910',
            type: UserRole.CLIENT,
            image: null
        }
    }]

    private readonly Domaincomments: CommentBlog[] = []
    private readonly DomainBlogs: Blog[] = []
    
    getAllBLogs(page?: number, perpage?: number, filter?: string, category?: string, trainer?: string): Promise<Result<Blog[]>> {
        throw new Error("Method not implemented.");
    }
    getBlogById(id: string): Promise<Result<Blog>> {
        throw new Error("Method not implemented.");
    }
    getBlogsTagsNames(tagsName: string[]): Promise<Result<Blog[]>> {
        throw new Error("Method not implemented.");
    }
    async saveBlog(blog: Blog): Promise<Result<Blog>> {
        this.DomainBlogs.push(blog);
        return Result.success<Blog>(blog);
    }
    
    async findAllCommentsByBlogId(id: BlogCommentBlogId): Promise<Result<CommentBlog[]>> {
        let comment = this.odmComments.filter(comment => comment.blog.id === id.BlogId.value);

        const DomainComment: CommentBlog[] = []
            comment.forEach(async e => {
                const commentBlog = CommentBlog.create(
                    BlogCommentId.create(e.id),
                    CommentBlogPublicationDate.create(e.publication_date),
                    CommentBlogBody.create(e.body),
                    CommentBlogUserId.create(e.user.id),
                    BlogCommentBlogId.create(BlogId.create(e.blog.id))
                );
                return commentBlog;
            });

        return Result.success<CommentBlog[]>(DomainComment);

    }
    async saveComment(comment: CommentBlog): Promise<Result<CommentBlog>> {
        this.Domaincomments.push(comment);
        return Result.success<CommentBlog>(comment);
    }
    getBlogsCount(category?: string, trainer?: string): Promise<Result<number>> {
        throw new Error("Method not implemented.");
    }

}