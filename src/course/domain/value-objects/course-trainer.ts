import { ValueObject } from "src/common/domain/value-object";
import { Uuid } from "../../../common/domain/value-objects/Uuid";
import { NullCourseTrainerNameException } from "../exceptions/nullCourseTrainerName";

export class CourseTrainer extends ValueObject<CourseTrainer> {
  readonly id: Uuid;
  readonly name: string;

  constructor(id: string, name: string) {
    super();

    if (!name) { throw new NullCourseTrainerNameException('No se proporcionó un nombre para el entrenador')}

    this.id = new Uuid(id);
    this.name = name;
  }

  equals(obj: CourseTrainer): boolean {
    return this.id.equals(obj.id);
  }
}