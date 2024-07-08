import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { IOdmProgressRepository } from "src/progress/application/repositories/odm-progress.repository";
import { ProgressRegister } from "src/progress/domain/events/progress-register.event";
import { Progress } from "src/progress/domain/progress";

export class SaveProgressEvent implements IEventSubscriber<ProgressRegister> {

    private readonly odmProgressRepository: IOdmProgressRepository;

    constructor (odmProgressRepository: IOdmProgressRepository) {
        this.odmProgressRepository = odmProgressRepository;
    }

    async on(event: ProgressRegister): Promise<void> {
        try {
            const progress = Progress.create(
                event.id,
                event.markAsCompleted,
                event.user,
                event.course,
                event.time,
                event.lastTime
            );

            await this.odmProgressRepository.saveProgress(progress)
    
        } catch (err) {
            return
        }
    }

}