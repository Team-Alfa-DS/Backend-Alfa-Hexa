import { ValueObject } from "../../../../src/common/domain/value-object";
import { EmptyTrainerCourseException } from "../exceptions/empty-trainer-courses-trainer";
import { CourseId } from "../../../../src/course/domain/value-objects/course-id";


export class TrainerCourseId extends ValueObject<TrainerCourseId>{
    private readonly courseId: CourseId

    private constructor(courseId: CourseId) {
        
        if (!courseId) throw new EmptyTrainerCourseException("El id de curso no existe");
        super();
        this.courseId = courseId //*Esto funciona para que no pueda ser modificado
    }

    get trainerCourseId(): CourseId {
        return this.courseId;
    }

    equals(obj: TrainerCourseId): boolean {
        return this.courseId === obj.courseId;
    }
    public static create(courseid: CourseId): TrainerCourseId {
        return new TrainerCourseId(courseid);
    }
}
