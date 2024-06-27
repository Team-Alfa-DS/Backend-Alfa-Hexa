import { ValueObject } from "src/common/domain/value-object";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { NullCourseTrainerException } from "../exceptions/nullCourseTrainer";

export class CourseTrainer extends ValueObject<CourseTrainer> {
  readonly value: TrainerId; 

  constructor(id: string) {
    super();

    if (!id) {throw new NullCourseTrainerException('No se proporcionó un valor para el entrenador')}
    
    this.value = TrainerId.create(id);
  }

  equals(obj: CourseTrainer): boolean {
    return this.value.equals(obj.value);
  }
}