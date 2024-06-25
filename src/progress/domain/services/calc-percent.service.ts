import { Lesson } from "src/course/domain/Lesson";
import { Progress } from "../progress";
import { CalcPercentProgressResponse, LessonProgress } from "../response/calc-percent-progress.response";

export class CalcPercentService {

    execute(lessonsCourse: Lesson[], progressUser: Progress[]): CalcPercentProgressResponse {
        let contCompleted = 0;
        let lessonList: LessonProgress[] = [];
        for (const pro of progressUser) {
            let percent = 0;

            if (pro.MarkAsCompleted) {
                contCompleted++;
            }
            
            const lesson = lessonsCourse.find(lesson => lesson.id == pro.Id.LessonId);
            percent = pro.Time.Time / lesson.seconds * 100
            lessonList.push({lessonId: pro.Id.LessonId, percent, time: pro.Time.Time});
        }

        const totalProgress = contCompleted / lessonsCourse.length * 100;
        const response: CalcPercentProgressResponse = {
            percent: totalProgress,
            lessons: lessonList
        }
        return response;
    }
}