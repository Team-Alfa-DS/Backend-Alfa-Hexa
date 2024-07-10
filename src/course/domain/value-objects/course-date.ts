import { ValueObject } from "src/common/domain/value-object";
import { NullCourseDateException } from "../exceptions/nullDateException";
import { CourseDateOutOfRangeException } from "../exceptions/courseDateOutOfRangeException";

export class CourseDate extends ValueObject<CourseDate> {
  readonly value: Date; 
  
  constructor(date: Date) {
    super();

    if (!date) { throw new NullCourseDateException(`La fecha no puede ser nula`)}

    // if (date > new Date()) { throw new CourseDateOutOfRangeException(`Se proporcionó una fecha que no ha ocurrido`)}

    this.value = date;
  }

  equals(obj: CourseDate): boolean {
    return this.value === obj.value;
  }
}