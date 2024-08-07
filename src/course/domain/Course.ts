import { Lesson } from './entities/Lesson';
import { Uuid } from "../../common/domain/value-objects/Uuid";
import { CourseCategory } from "./value-objects/course-category";
import { CourseDescription } from "./value-objects/course-description";
import { CourseDurationMinutes } from "./value-objects/course-durationMinutes";
import { CourseDurationWeeks } from "./value-objects/course-durationWeeks";
import { CourseLevel } from "./value-objects/course-level";
import { CourseTag } from "./value-objects/course-tag";
import { CourseTitle } from "./value-objects/course-title";
import { CourseTrainer } from "./value-objects/course-trainer";
import { Url } from "../../common/domain/value-objects/url";
import { AggregateRoot } from "src/common/domain/aggregate-root";
import { CourseId } from "./value-objects/course-id";
import { CourseImage } from "./value-objects/course-image";
import { CourseCreated } from "./events/course-created.event";
import { DomainEvent } from "src/common/domain/domain-event";
import { InvalidCourseException } from "./exceptions/invalidCourseException";
import { LessonId } from "./value-objects/lesson-id";
import { CourseRegistered } from "./events/course-registered.event";
import { LessonTitle } from "./value-objects/lesson-title";
import { LessonContent } from "./value-objects/lesson-content";
import { LessonDuration } from "./value-objects/lesson-duration";
import { LessonVideo } from "./value-objects/lesson-video";
import { LessonPosted } from "./events/lesson-posted.event";
import { CourseDate } from "./value-objects/course-date";
import { LessonCommentId } from "src/comment/domain/valueObjects/lesson/comment-lesson-id";
import { CommentLessonPublicationDate } from "src/comment/domain/valueObjects/lesson/comment-lesson-publicationDate";
import { CommentLessonUserDisliked } from 'src/comment/domain/valueObjects/lesson/comment-lesson-userDisliked';
import { CommentLessonBody } from 'src/comment/domain/valueObjects/lesson/comment-lesson-body';
import { CommentLessonUserId } from 'src/comment/domain/valueObjects/lesson/comment-lesson-userId';
import { LessonCommentLessonId } from 'src/comment/domain/valueObjects/lesson/comment-lesson-lessonId';
import { CommentLessonUserLiked } from 'src/comment/domain/valueObjects/lesson/comment-lesson-userLiked';
import { CommentLessonPosted } from './events/comment-lesson-posted.event';
import { CommentLesson } from './entities/comment-lesson';

export class Course extends AggregateRoot<CourseId>{
  // private id: CourseId;
  private title: CourseTitle;
  private description: CourseDescription;
  private image: CourseImage;
  private date: CourseDate;
  private durationMinutes: CourseDurationMinutes;
  private durationWeeks: CourseDurationWeeks;
  private level: CourseLevel;
  private lessons: Lesson[];
  private tags: CourseTag[];
  private category: CourseCategory; 
  private trainer: CourseTrainer; 

  private constructor(
    id: CourseId,
    title: CourseTitle,
    description: CourseDescription,
    image: CourseImage,
    date: CourseDate,
    durationMinutes: CourseDurationMinutes,
    durationWeeks: CourseDurationWeeks,
    level: CourseLevel,
    lessons: Lesson[],
    tags: CourseTag[],
    category: CourseCategory, 
    trainer: CourseTrainer 
  ) {
    const courseCreated = new CourseCreated(id, title, description, image, date, durationMinutes, durationWeeks, level, lessons, tags, category, trainer);
    super(id, courseCreated);
  }

  static create(
    id: CourseId,
    title: CourseTitle,
    description: CourseDescription,
    image: CourseImage,
    date: CourseDate,
    durationMinutes: CourseDurationMinutes,
    durationWeeks: CourseDurationWeeks,
    level: CourseLevel,
    lessons: Lesson[],
    tags: CourseTag[],
    category: CourseCategory, 
    trainer: CourseTrainer 
  ): Course {
    return new Course(id, title, description, image, date, durationMinutes, durationWeeks, level, lessons, tags, category, trainer);
  }
  
  register(
    id: CourseId,
    title: CourseTitle,
    description: CourseDescription,
    image: CourseImage,
    date: CourseDate,
    durationMinutes: CourseDurationMinutes,
    durationWeeks: CourseDurationWeeks,
    level: CourseLevel,
    lessons: Lesson[],
    tags: CourseTag[],
    category: CourseCategory, 
    trainer: CourseTrainer 
  ) {
    this.apply(new CourseRegistered(id, title, description, image, date, durationMinutes, durationWeeks, level, tags, category, trainer));
  }

  postLesson(
    id: LessonId,
    title: LessonTitle,
    content: LessonContent,
    seconds: LessonDuration,
    video: LessonVideo
    // comments: CommentLesson[]
  ) {
    this.apply(new LessonPosted(id, title, content, seconds, video, this.Id));
  }

  createComment(
    id: LessonCommentId,
    publicationDate: CommentLessonPublicationDate,
    body: CommentLessonBody,
    userId: CommentLessonUserId,
    LessonId: LessonCommentLessonId,
    // userLiked: CommentLessonUserLiked,
    // userDisliked: CommentLessonUserDisliked
  ){
    this.apply(new CommentLessonPosted(id, publicationDate, body, userId, LessonId));
    // this.apply(new CommentPosted(id, publicationDate, body, userId, LessonId, userLiked, userDisliked));
  }


  protected when(event: DomainEvent): void {
    if (event instanceof CourseCreated) {
      this.title = event.title;
      this.description = event.description;
      this.image = event.image;
      this.date = event.date;
      this.durationMinutes = event.durationMinutes;
      this.durationWeeks = event.durationWeeks;
      this.level = event.level;
      this.lessons = event.lessons;
      this.tags = event.tags;
      this.category = event.category;
      this.trainer = event.trainer;
    }

    if (event instanceof LessonPosted) {

      const lesson = new Lesson(
        event.id,
        event.title,
        event.content,
        event.seconds,
        event.video,
        [] // event.comments
      );

      this.lessons.push(lesson);
      // this.addMinutes(new CourseDurationMinutes((Math.round(event.seconds.value/60))))
      this.durationMinutes = new CourseDurationMinutes(0);
      let seconds:number = 0
      for (let lesson of this.lessons) {
        seconds += lesson.seconds.value;
      }
      this.addMinutes(new CourseDurationMinutes(Math.round(seconds / 60)));
    }

    if (event instanceof CommentLessonPosted){
      const comment: CommentLesson = CommentLesson.create(
        event.id,
        event.publicationDate,
        event.body,
        event.userId,
        event.LessonId,
        // event.userLiked,
        // event.userDisliked
      );

      let lesson = this.getLesson(event.LessonId.LessonId);
      lesson.comments.push(comment);
      
    }
  }
  
  protected validateState(): void {
    if (!this.title || !this.description || !this.image || !this.date || !this.durationMinutes 
      || !this.durationWeeks || !this.level || !this.lessons || !this.tags || !this.category || !this.trainer) {
        throw new InvalidCourseException('El curso no es válido');
      }
  }
  
  get Id(): CourseId {
    return new CourseId(super.Id.Value);
  }

  get Title(): CourseTitle {
    return new CourseTitle(this.title.value)
  }

  get Description(): CourseDescription {
    return new CourseDescription(this.description.value)
  }

  get Image(): CourseImage {
    return new CourseImage(this.image.Value);
  }

  get Date(): CourseDate {
    return new CourseDate(this.date.value)
  }

  get DurationMinutes(): CourseDurationMinutes {
    return new CourseDurationMinutes(this.durationMinutes.value)
  }

  private addMinutes(minutes: CourseDurationMinutes): void {
    this.durationMinutes = new CourseDurationMinutes(this.durationMinutes.value + minutes.value);
  }

  get DurationWeeks(): CourseDurationWeeks {
    return new CourseDurationWeeks(this.durationWeeks.value)
  }

  get Level(): CourseLevel {
    return new CourseLevel(this.level.value)
  }

  get Lessons(): Lesson[] {
    return this.lessons;
  }

  getLesson(id: LessonId): Lesson {
    return this.lessons.find(lesson => lesson.id.equals(id));
  }

  getComment(id: LessonId, commentId: LessonCommentId): CommentLesson {
    const lesson = this.getLesson(id);
    return lesson.comments.find(comment => comment.Id.equals(commentId));
  }

  get Tags(): CourseTag[] {
    const tags:CourseTag[] = [];
    for (let tag of this.tags) {
      tags.push(new CourseTag(tag.name));
    }

    return tags;
  }

  containsTag(searchedTag: CourseTag): boolean {
    for (let tag of this.tags) {
      if (tag.equals(searchedTag)) {
        return true;
      }
    }
    return false;
  }

  get Category(): CourseCategory {
    return new CourseCategory(this.category.value.value);
  }

  get Trainer(): CourseTrainer {
    return new CourseTrainer(this.trainer.value.trainerId);
  }
}