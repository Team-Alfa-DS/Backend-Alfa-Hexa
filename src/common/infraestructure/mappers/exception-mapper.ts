import { HttpException, HttpStatus } from "@nestjs/common";
import { BlogNotFoundException } from "src/blog/domain/exceptions/blog-not-found.exception";
import { InvalidBlogContent } from "src/blog/domain/exceptions/invalidBlogContent";
import { InvalidBlogException } from "src/blog/domain/exceptions/invalidBlogException";
import { InvalidBlogId } from "src/blog/domain/exceptions/invalidBlogId";
import { InvalidBlogImage } from "src/blog/domain/exceptions/invalidBlogImage";
import { InvalidBlogPublicationDate } from "src/blog/domain/exceptions/invalidBlogPublicationDate";
import { InvalidBlogTag } from "src/blog/domain/exceptions/invalidBlogTag";
import { InvalidBlogTitle } from "src/blog/domain/exceptions/invalidBlogTitle";
import { CategoryNotFoundException } from "src/category/domain/exceptions/category-not-found-exception";
import { EmptyCategoryIconException } from "src/category/domain/exceptions/empty-category-icon.exception";
import { EmptyCategoryIdException } from "src/category/domain/exceptions/empty-category-id.exception";
import { EmptyCategoryNameException } from "src/category/domain/exceptions/empty-category-name.exception";
import { NotCorrectFormatCategoryIDException } from "src/category/domain/exceptions/not-correct-format-category-id.exception";
import { BadFormaBlogCommentPublicationDateException } from "src/comment/domain/exceptions/blog/bad-format-comment-blog-publicationDate-exception";
import { CommentsBlogNotFoundException } from "src/comment/domain/exceptions/blog/comments-blog-not-found-exception";
import { EmptyBlogCommentBlogIdException } from "src/comment/domain/exceptions/blog/empty-comment-blog-blogid-exception";
import { EmptyBlogCommentIdException } from "src/comment/domain/exceptions/blog/empty-comment-blog-id-exception";
import { EmptyBlogCommentPublicationDateException } from "src/comment/domain/exceptions/blog/empty-comment-blog-publicationDate-exception";
import { EmptyBlogCommentUserIdException } from "src/comment/domain/exceptions/blog/empty-comment-blog-userid-exception";
import { ExceededBlogCommentPublicationDateException } from "src/comment/domain/exceptions/blog/exceeded-comment-blog-publicationDate-exception";
import { InvalidBlogCommentBodyException } from "src/comment/domain/exceptions/blog/invalid-comment-blog-body-exception";
import { BadFormatLessonCommentPublicationDateException } from "src/comment/domain/exceptions/lesson/bad-format-comment-lesson-publicationDate-exception";
import { CommentsLessonNotFoundException } from "src/comment/domain/exceptions/lesson/comments-lesson-not-found-exception";
import { EmptyLessonCommentIdException } from "src/comment/domain/exceptions/lesson/empty-comment-lesson-id-exception";
import { EmptyLessonCommentLessonIdException } from "src/comment/domain/exceptions/lesson/empty-comment-lesson-lessonid-exception";
import { EmptyLessonCommentPublicationDateException } from "src/comment/domain/exceptions/lesson/empty-comment-lesson-publicationDate-exception";
import { EmptyLessonCommentUserIdException } from "src/comment/domain/exceptions/lesson/empty-comment-lesson-userid-exception";
import { ExceededLessonCommentPublicationDateException } from "src/comment/domain/exceptions/lesson/exceeded-comment-publicationDate-exception";
import { InvalidLessonCommentBodyException } from "src/comment/domain/exceptions/lesson/invalid-comment-lesson-body-exception";
import { CourseNotFoundException } from "src/course/domain/exceptions/courseNotFound";
import { InvalidCourseException } from "src/course/domain/exceptions/invalidCourseException";
import { NegativeCourseMinutesException } from "src/course/domain/exceptions/negativeCourseMinutes";
import { NegativeCourseWeeksException } from "src/course/domain/exceptions/negativeCourseWeeks";
import { NegativeLessonSecondsException } from "src/course/domain/exceptions/negativeLessonSeconds";
import { NullCourseCategoryException } from "src/course/domain/exceptions/nullCourseCategory";
import { NullCourseDescriptionException } from "src/course/domain/exceptions/nullCourseDescription";
import { NullCourseIdException } from "src/course/domain/exceptions/nullCourseId";
import { NullCourseImageException } from "src/course/domain/exceptions/nullCourseImage";
import { NullCourseLevelException } from "src/course/domain/exceptions/nullCourseLevel";
import { NullCourseMinutesException } from "src/course/domain/exceptions/nullCourseMinutes";
import { NullCourseTagException } from "src/course/domain/exceptions/nullCourseTag";
import { NullCourseTitleException } from "src/course/domain/exceptions/nullCourseTitle";
import { NullCourseTrainerException } from "src/course/domain/exceptions/nullCourseTrainer";
import { NullCourseWeekException } from "src/course/domain/exceptions/nullCourseWeeks";
import { NullLessonContentException } from "src/course/domain/exceptions/nullLessonContent";
import { NullLessonIdException } from "src/course/domain/exceptions/nullLessonId";
import { NullLessonSecondsException } from "src/course/domain/exceptions/nullLessonSeconds";
import { NullLessonTitleException } from "src/course/domain/exceptions/nullLessonTitle";
import { NullLessonVideoException } from "src/course/domain/exceptions/nullLessonVideo";
import { InvalidProgressIdException } from "src/progress/domain/exceptions/invalid-progress-id.exception";
import { InvalidProgressLastTimeException } from "src/progress/domain/exceptions/invalid-progress-lastTime.exception";
import { InvalidProgressLessonIdException } from "src/progress/domain/exceptions/invalid-progress-lessonId.exception";
import { InvalidProgressMarkAsCompletedException } from "src/progress/domain/exceptions/invalid-progress-markAsCompleted.exception";
import { InvalidProgressTimeException } from "src/progress/domain/exceptions/invalid-progress-time.exception";
import { InvalidProgressUserIdException } from "src/progress/domain/exceptions/invalid-progress-userId.exception";
import { InvalidProgressException } from "src/progress/domain/exceptions/invalid-progress.exception";
import { ProgressNotFoundException } from "src/progress/domain/exceptions/progress-not-found-exception";
import { EmptyTrainerBlogIdException } from "src/trainer/domain/exceptions/empty-trainer-blogid-trainer";
import { EmptyTrainerCourseException } from "src/trainer/domain/exceptions/empty-trainer-courses-trainer";
import { EmptyTrainerFollowerException } from "src/trainer/domain/exceptions/empty-trainer-follower-exception";
import { EmptyTrainerIdException } from "src/trainer/domain/exceptions/empty-trainer-id-exception";
import { EmptyTrainerLocationException } from "src/trainer/domain/exceptions/empty-trainer-location-exception";
import { EmptyTrainerNameException } from "src/trainer/domain/exceptions/empty-trainer-name-exception";
import { EmptyuserIdExceptionTrainer } from "src/trainer/domain/exceptions/empty-trainer-userid-exception";
import { InvalidTrainerException } from "src/trainer/domain/exceptions/Invalid-trainer-exception";
import { InvalidTrainerLocationException } from "src/trainer/domain/exceptions/invalid-trainer-location-exception";
import { InvalidTrainerNameException } from "src/trainer/domain/exceptions/invalid-trainer-name-exception";
import { TrainerNotFoundException } from "src/trainer/domain/exceptions/trainer-not-found-exception";
import { InvalidUserEmailException } from "src/user/domain/exceptions/invalid-user-email.exception";
import { InvalidUserIdException } from "src/user/domain/exceptions/invalid-user-id.exception";
import { InvalidUserImageException } from "src/user/domain/exceptions/invalid-user-image.exception";
import { InvalidUserNameException } from "src/user/domain/exceptions/invalid-user-name.exception";
import { InvalidUserPasswordException } from "src/user/domain/exceptions/invalid-user-password.exception";
import { InvalidUserPhoneException } from "src/user/domain/exceptions/invalid-user-phone.exception";
import { InvalidUserTypeException } from "src/user/domain/exceptions/invalid-user-type.exception";
import { InvalidUserException } from "src/user/domain/exceptions/invalid-user.exception";
import { UserNotFoundException } from "src/user/domain/exceptions/user-not-found-exception";

export class ExceptionMapper {

  static toHttp(error: Error): HttpException {
    switch (error.constructor) {

      //user Exceptions
      case (UserNotFoundException): return new HttpException(error.message, 404);
      case (InvalidUserEmailException): return new HttpException(error.message, 404);
      case (InvalidUserIdException): return new HttpException(error.message, 404);
      case (InvalidUserImageException): return new HttpException(error.message, 404);
      case (InvalidUserNameException): return new HttpException(error.message, 404);
      case (InvalidUserPasswordException): return new HttpException(error.message, 404);
      case (InvalidUserPhoneException): return new HttpException(error.message, 404);
      case (InvalidUserTypeException): return new HttpException(error.message, 404);
      case (InvalidUserException): return new HttpException(error.message, 404);

      //Course Exceptions
      case (CourseNotFoundException): return new HttpException(error.message, HttpStatus.NOT_FOUND);
      case (InvalidCourseException): return new HttpException(error.message, 404);
      case (NegativeCourseMinutesException): return new HttpException(error.message, 404);
      case (NegativeCourseWeeksException): return new HttpException(error.message, 404);
      case (NullCourseCategoryException): return new HttpException(error.message, 404);
      case (NullCourseDescriptionException): return new HttpException(error.message, 404);
      case (NullCourseIdException): return new HttpException(error.message, 404);
      case (NullCourseImageException): return new HttpException(error.message, 404);
      case (NullCourseLevelException): return new HttpException(error.message, 404);
      case (NullCourseMinutesException): return new HttpException(error.message, 404);
      case (NullCourseTagException): return new HttpException(error.message, 404);
      case (NullCourseTitleException): return new HttpException(error.message, 404);
      case (NullCourseTrainerException): return new HttpException(error.message, 404);
      case (NullCourseWeekException): return new HttpException(error.message, 404);
      
      //Lesson Exceptions
      case (NegativeLessonSecondsException): return new HttpException(error.message, 404);
      case (NullLessonContentException): return new HttpException(error.message, 404);
      case (NullLessonIdException): return new HttpException(error.message, 404);
      case (NullLessonSecondsException): return new HttpException(error.message, 404);
      case (NullLessonTitleException): return new HttpException(error.message, 404);
      case (NullLessonVideoException): return new HttpException(error.message, 404);

      //CommentLesson Exceptions
      case (BadFormatLessonCommentPublicationDateException): return new HttpException(error.message, 404);
      case (CommentsLessonNotFoundException): return new HttpException(error.message, 404);
      case (EmptyLessonCommentIdException): return new HttpException(error.message, 404);
      case (EmptyLessonCommentLessonIdException): return new HttpException(error.message, 404);
      case (EmptyLessonCommentPublicationDateException): return new HttpException(error.message, 404);
      case (EmptyLessonCommentUserIdException): return new HttpException(error.message, 404);
      case (ExceededLessonCommentPublicationDateException): return new HttpException(error.message, 404);
      case (InvalidLessonCommentBodyException): return new HttpException(error.message, 404);

      //CommentBlog Exceptions
      case (BadFormaBlogCommentPublicationDateException): return new HttpException(error.message, 404);
      case (CommentsBlogNotFoundException): return new HttpException(error.message, 404);
      case (EmptyBlogCommentBlogIdException): return new HttpException(error.message, 404);
      case (EmptyBlogCommentIdException): return new HttpException(error.message, 404);
      case (EmptyBlogCommentPublicationDateException): return new HttpException(error.message, 404);
      case (EmptyBlogCommentUserIdException): return new HttpException(error.message, 404);
      case (ExceededBlogCommentPublicationDateException): return new HttpException(error.message, 404);
      case (InvalidBlogCommentBodyException): return new HttpException(error.message, 404);

      //Blog Exceptions
      case (BlogNotFoundException): return new HttpException(error.message, 404);
      case (InvalidBlogContent): return new HttpException(error.message, 404);
      case (InvalidBlogException): return new HttpException(error.message, 404);
      case (InvalidBlogId): return new HttpException(error.message, 404);
      case (InvalidBlogImage): return new HttpException(error.message, 404);
      case (InvalidBlogPublicationDate): return new HttpException(error.message, 404);
      case (InvalidBlogTag): return new HttpException(error.message, 404);
      case (InvalidBlogTitle): return new HttpException(error.message, 404);

      //Category Exceptions
      case (CategoryNotFoundException): return new HttpException(error.message, 404);
      case (EmptyCategoryIconException): return new HttpException(error.message, 404);
      case (EmptyCategoryIdException): return new HttpException(error.message, 404);
      case (EmptyCategoryNameException): return new HttpException(error.message, 404);
      case (NotCorrectFormatCategoryIDException): return new HttpException(error.message, 404);

      //Progress Exceptions
      case (InvalidProgressIdException): return new HttpException(error.message, 404);
      case (InvalidProgressLastTimeException): return new HttpException(error.message, 404);
      case (InvalidProgressLessonIdException): return new HttpException(error.message, 404);
      case (InvalidProgressMarkAsCompletedException): return new HttpException(error.message, 404);
      case (InvalidProgressTimeException): return new HttpException(error.message, 404);
      case (InvalidProgressUserIdException): return new HttpException(error.message, 404);
      case (InvalidProgressException): return new HttpException(error.message, 404);
      case (ProgressNotFoundException): return new HttpException(error.message, 404);

      //Trainer Exceptions
      case (EmptyTrainerBlogIdException): return new HttpException(error.message, 404);
      case (EmptyTrainerCourseException): return new HttpException(error.message, 404);
      case (EmptyTrainerFollowerException): return new HttpException(error.message, 404);
      case (EmptyTrainerIdException): return new HttpException(error.message, 404);
      case (EmptyTrainerLocationException): return new HttpException(error.message, 404);
      case (EmptyTrainerNameException): return new HttpException(error.message, 404);
      case (EmptyuserIdExceptionTrainer): return new HttpException(error.message, 404);
      case (InvalidTrainerException): return new HttpException(error.message, 404);
      case (InvalidTrainerLocationException): return new HttpException(error.message, 404);
      case (InvalidTrainerNameException): return new HttpException(error.message, 404);
      case (TrainerNotFoundException): return new HttpException(error.message, 404);


      default: return new HttpException('Ocurrió un error desconocido', 404);
    }
  }
}