import { Result } from "src/common/domain/result-handler/result";
import { Lesson } from "src/course/domain/entities/Lesson";
import { Progress } from "src/progress/domain/progress";
import { UserId } from "src/user/domain/value-objects/user-id";

export interface IOdmProgressRepository {
    saveProgress(progress: Progress): Promise<void>;
    findProgressByUserCourse(userId: UserId, lessons: Lesson[]): Promise<Result<Progress[]>>;
    findLastProgressByUser(userId: UserId): Promise<Result<Progress>>;
    findProgressByUser(userId: UserId): Promise<Result<Progress[]>>;
}