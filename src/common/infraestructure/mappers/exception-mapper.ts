import { HttpException, HttpStatus } from "@nestjs/common";

export class ExceptionMapper {

  static toHttp(error: Error): HttpException {
    switch (error) {

      default: return new HttpException('Ocurrió un error desconocido', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}