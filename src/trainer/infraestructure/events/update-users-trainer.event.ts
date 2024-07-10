import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { TrainerUsersUpdated } from "src/trainer/domain/events/trainer-users-updated.event";
import { IOdmTrainerRepository } from "src/trainer/domain/repositories/odm-trainer-repository.interface";
import { Trainer } from "src/trainer/domain/trainer";

export class UpdateUsersTrainersEvent implements IEventSubscriber<TrainerUsersUpdated> {

    private readonly odmTrainerRepository: IOdmTrainerRepository;

    constructor(odmTrainerRepository: IOdmTrainerRepository) {
        this.odmTrainerRepository = odmTrainerRepository;
    }

    async on(event: TrainerUsersUpdated): Promise<void> {
        try {
            const trainer = await this.odmTrainerRepository.findTrainerById(event.id);
            const updatedTrainer = Trainer.create(
                trainer.Value.Id,
                trainer.Value.Name,
                trainer.Value.Followers,
                trainer.Value.Location,
                trainer.Value.Courses,
                trainer.Value.Blogs,
                event.users
            );
            await this.odmTrainerRepository.followTrainer(updatedTrainer);
        } catch (err) {
            return
        }
    }

}