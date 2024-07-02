import { HttpException, HttpStatus } from "@nestjs/common";
import { CourseNotFoundException } from "src/course/domain/exceptions/courseNotFound";

export class ExceptionMapper {

  static toHttp(error: Error): HttpException {
    switch (error.constructor) {
      case (CourseNotFoundException): return new HttpException(error.message, HttpStatus.NOT_FOUND);

      default: return new HttpException('Ocurrió un error desconocido', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}