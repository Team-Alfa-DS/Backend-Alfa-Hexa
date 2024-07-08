import { HttpException, HttpStatus } from "@nestjs/common";
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

export class ExceptionMapper {

  static toHttp(error: Error): HttpException {
    switch (error.constructor) {
      //Course Exceptions
      case (CourseNotFoundException): return new HttpException(error.message, HttpStatus.NOT_FOUND);
      case (InvalidCourseException): return new HttpException(error.message, 430);
      case (NegativeCourseMinutesException): return new HttpException(error.message, 440);
      case (NegativeCourseWeeksException): return new HttpException(error.message, 440);
      case (NullCourseCategoryException): return new HttpException(error.message, 440);
      case (NullCourseDescriptionException): return new HttpException(error.message, 440);
      case (NullCourseIdException): return new HttpException(error.message, 440);
      case (NullCourseImageException): return new HttpException(error.message, 440);
      case (NullCourseLevelException): return new HttpException(error.message, 440);
      case (NullCourseMinutesException): return new HttpException(error.message, 440);
      case (NullCourseTagException): return new HttpException(error.message, 440);
      case (NullCourseTitleException): return new HttpException(error.message, 440);
      case (NullCourseTrainerException): return new HttpException(error.message, 440);
      case (NullCourseWeekException): return new HttpException(error.message, 440);
      
      //Lesson Exceptions
      case (NegativeLessonSecondsException): return new HttpException(error.message, 450);
      case (NullLessonContentException): return new HttpException(error.message, 450);
      case (NullLessonIdException): return new HttpException(error.message, 450);
      case (NullLessonSecondsException): return new HttpException(error.message, 450);
      case (NullLessonTitleException): return new HttpException(error.message, 450);
      case (NullLessonVideoException): return new HttpException(error.message, 450);

      default: return new HttpException('Ocurrió un error desconocido', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}