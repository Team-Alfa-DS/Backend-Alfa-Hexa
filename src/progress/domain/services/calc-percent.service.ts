import { Lesson } from "src/course/domain/entities/Lesson";
import { Progress } from "../progress";
import { CalcPercentProgressResponse, LessonProgress } from "../response/calc-percent-progress.response";
import { Uuid } from "src/common/domain/value-objects/Uuid";
import { LessonId } from "src/course/domain/value-objects/lesson-id";

export class CalcPercentService {

    execute(lessonsCourse: Lesson[], progressUser: Progress[]): CalcPercentProgressResponse {
        let contCompleted = 0;
        let lessonList: LessonProgress[] = [];
        for (const pro of progressUser) {
            let percent = 0;

            if (pro.MarkAsCompleted) {
                contCompleted++;
            }
            
            const lesson = lessonsCourse.find(lesson => lesson.id.equals(new LessonId(pro.Id.LessonId)) );
            if (pro.Time) {
                percent = pro.Time.Time / lesson.seconds.value * 100
            }
            lessonList.push({lessonId: pro.Id.LessonId, percent});
        }

        const totalProgress = contCompleted / lessonsCourse.length * 100;
        const response: CalcPercentProgressResponse = {
            percent: totalProgress,
            lessons: lessonList
        }
        return response;
    }
}