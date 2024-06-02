import { Lesson } from "src/course/domain/Lesson";
import { Progress } from "../progress";
import { Result } from "src/common/domain/result-handler/result";
import { GetOneProgressResponse, LessonProgress } from "../response/get-one-progress.response";

export class CalcPercentService {

    execute(lessonsCourse: Lesson[], progressUser: Progress[]): GetOneProgressResponse {
        let contCompleted = 0;
        let lessonList: LessonProgress[] = [];
        for (const pro of progressUser) {
            let percent = 0;
            if (pro.MarkAsCompleted) {
                contCompleted++;
                percent = 100
            }
            lessonList.push({lessonId: pro.LessonId, percent});
        }

        const totalProgress = contCompleted / lessonsCourse.length * 100;
        const response: GetOneProgressResponse = {
            percent: totalProgress,
            lessons: lessonList
        }
        return response;
    }
}