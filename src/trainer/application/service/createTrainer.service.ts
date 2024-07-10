import { IService } from "src/common/application/interfaces/IService";
import { CreateTrainerRequest } from "../dto/request/create-trainer.request";
import { CreateTrainerResponse } from "../dto/response/create-trainer.response";
import { Result } from "src/common/domain/result-handler/result";
import { ITrainerRepository } from "src/trainer/domain/repositories/trainer-repository.interface";
import { IOdmTrainerRepository } from "src/trainer/domain/repositories/odm-trainer-repository.interface";
import { TrainerName } from "src/trainer/domain/valueObjects/trainer-name";
import { TrainerAlreadyExistException } from "src/trainer/domain/exceptions/trainer-already-exist.exception";
import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";
import { IIdGen } from "src/common/application/id-gen/id-gen.interface";
import { Trainer } from "src/trainer/domain/trainer";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { TrainerFollower } from "src/trainer/domain/valueObjects/trainer-followers";
import { TrainerLocation } from "src/trainer/domain/valueObjects/trainer-location";

export class CreateTrainerService extends IService<CreateTrainerRequest, CreateTrainerResponse> {

    private readonly ormTrainerRepository: ITrainerRepository;
    private readonly odmTrainerRepository: IOdmTrainerRepository;
    private readonly genId: IIdGen;
    private readonly eventPublisher: IEventPublisher;

    constructor(ormTrainerRepository: ITrainerRepository, odmTrainerRepository: IOdmTrainerRepository, genId: IIdGen, eventPublisher: IEventPublisher) {
        super();
        this.ormTrainerRepository = ormTrainerRepository;
        this.odmTrainerRepository = odmTrainerRepository;
        this.genId = genId;
        this.eventPublisher = eventPublisher;
    }

    async execute(value: CreateTrainerRequest): Promise<Result<CreateTrainerResponse>> {
        try {
            const trainer = await this.odmTrainerRepository.findTrainerByName(TrainerName.create(value.name));
            if (trainer) throw new TrainerAlreadyExistException(`Ya existe el trainer con nombre ${value.name}`);
            const trainerDomain = Trainer.create(
                TrainerId.create(await this.genId.genId()),
                TrainerName.create(value.name),
                TrainerFollower.create(0),
                TrainerLocation.create(value.location),
                null,
                null,
                null
            );
            await this.ormTrainerRepository.saveTrainer(trainerDomain);
            trainerDomain.Register()
            this.eventPublisher.publish(trainerDomain.pullDomainEvents());
            const response = new CreateTrainerResponse()
            return Result.success(response);
        } catch(err) {
            return Result.fail(err);
        }
    }

}