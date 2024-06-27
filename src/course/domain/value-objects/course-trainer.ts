import { ValueObject } from "src/common/domain/value-object";
import { Uuid } from "../../../common/domain/value-objects/Uuid";
import { NullCourseTrainerNameException } from "../exceptions/nullCourseTrainerName";

export class CourseTrainer extends ValueObject<CourseTrainer> {
  private id: Uuid; //FIXME: Esto debería ser TrainerId

  constructor(id: string) {
    super();

    this.id = new Uuid(id);
  }

  equals(obj: CourseTrainer): boolean {
    return this.id.equals(obj.id);
  }

  get Value(): string {
    return this.id.value;
  }
}