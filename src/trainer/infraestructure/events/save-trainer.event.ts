import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { TrainerRegister } from "src/trainer/domain/events/trainer-Register.event";
import { IOdmTrainerRepository } from "src/trainer/domain/repositories/odm-trainer-repository.interface";
import { Trainer } from "src/trainer/domain/trainer";

export class SaveTrainerEvent implements IEventSubscriber<TrainerRegister> {

    private readonly odmTrainerRepository: IOdmTrainerRepository;

    constructor(odmTrainerRepository: IOdmTrainerRepository) {
        this.odmTrainerRepository = odmTrainerRepository;
    }

    async on(event: TrainerRegister): Promise<void> {
        const trainer = Trainer.create(
            event.id,
            event.name,
            event.followers,
            event.trainerlocation,
            event.courses,
            event.blogs,
            event.users
        );
        await this.odmTrainerRepository.saveTrainer(trainer);
    }

}