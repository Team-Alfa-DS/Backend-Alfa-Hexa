import { Uuid } from "../../../common/domain/value-objects/Uuid";
import { LessonContent } from "../value-objects/lesson-content";
import { LessonDuration } from "../value-objects/lesson-duration";
import { LessonTitle } from "../value-objects/lesson-title";
import { Url } from "../../../common/domain/value-objects/url";
import { LessonVideo } from "../value-objects/lesson-video";
import { LessonId } from "../value-objects/lesson-id";
import { CommentLesson } from "src/comment/domain/comment-lesson";

export class Lesson {
  readonly id: LessonId;
  readonly title: LessonTitle;
  readonly content: LessonContent;
  readonly seconds: LessonDuration;
  readonly video: LessonVideo;
  readonly comments: CommentLesson[];

  constructor(
    id: LessonId, 
    title: LessonTitle, 
    content: LessonContent, 
    seconds: LessonDuration, 
    video: LessonVideo,
    comments: CommentLesson[]
  ) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.seconds = seconds;
      this.video = video;
      this.comments = comments;
  }
}