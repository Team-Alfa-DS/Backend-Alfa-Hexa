import { CalcPercentProgressResponse } from "../response/calc-percent-progress.response";
import { CalcTotalCoursesPercentProgressResponse } from "../response/calc-total-courses-percent-progress.response";

export class CalcTotalCoursesPercentService {

    execute(userCoursesProgress: CalcPercentProgressResponse[]) {
        let totalPercent = 0;
        let totalTime = 0

        for (const course of userCoursesProgress) {
            totalPercent += course.percent;
            for (const lesson of course.lessons) {
                totalTime += lesson.time;
            }
        }

        totalPercent /= userCoursesProgress.length;
        totalTime /= 3600 //transformacion de segundos a horas

        const response: CalcTotalCoursesPercentProgressResponse = {
            percent: totalPercent,
            time: totalTime
        }

        return response;
    }
}