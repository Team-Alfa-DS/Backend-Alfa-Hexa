import { Model } from "mongoose";
import { Result } from "src/common/domain/result-handler/result";
import { IOdmTrainerRepository } from "src/trainer/domain/repositories/odm-trainer-repository.interface";
import { Trainer } from "src/trainer/domain/trainer";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { UserId } from "src/user/domain/value-objects/user-id";
import { OdmTrainerEntity } from "../entities/odm-entities/odm-trainer.entity";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";
import { TrainerNotFoundException } from "src/trainer/domain/exceptions/trainer-not-found-exception";
import { TrainerFollowerUserId } from "src/trainer/domain/valueObjects/trainer-userid";
import { TrainerName } from "src/trainer/domain/valueObjects/trainer-name";

export class OdmTrainerRepository implements IOdmTrainerRepository{

    private readonly trainerModel: Model<OdmTrainerEntity>;
    private readonly odmTrainerMapper: IMapper<Trainer, OdmTrainerEntity>;

    constructor(trainerModel: Model<OdmTrainerEntity>, odmTrainerMapper: IMapper<Trainer, OdmTrainerEntity>) {
        this.trainerModel = trainerModel;
        this.odmTrainerMapper = odmTrainerMapper;
    }

    async findTrainerById(id: TrainerId): Promise<Result<Trainer>> {
        let trainerId = id.trainerId;

        const trainer = await this.trainerModel.findOne({id: trainerId});
        if (!trainer) {
            // return Result.fail<Trainer>(new TrainerNotFoundException(`No se encontro al entrenador con el id ${trainerId}`));
            throw new TrainerNotFoundException(`No se encontro al entrenador con el id ${trainerId}`);
        }

        const trainerDomain = await this.odmTrainerMapper.toDomain(trainer);
        const oneTrainer = Result.success<Trainer>(trainerDomain);
        return oneTrainer;
    }

    async findTrainerByName(name: TrainerName): Promise<boolean> {
        const trainer = await this.trainerModel.findOne({name: name.trainerName});
        if (trainer) return true;
        return false;
    }

    async findFollowByUserId(trainerId: TrainerId, userId: TrainerFollowerUserId): Promise<boolean> {
        const trainer = await this.trainerModel.findOne({id: trainerId.trainerId, 'followers.id': userId.trainerFollowerUserId.Id});
        if (trainer) return true;
        return false;
    }

    async followTrainer(trainer: Trainer): Promise<void> {
        const trainerOdm = await this.odmTrainerMapper.toPersistence(trainer);
        await this.trainerModel.updateOne({id: trainer.Id.trainerId}, {followers: trainerOdm.followers});
    }

    async findAllTrainers(userfollow?: boolean, userId?: string, page?: number, perpage?: number): Promise<Result<Trainer[]>> {
        let trainers = []

        if (userfollow) {
            trainers = await this.trainerModel.find({'followers.id': userId})
        } else {
            const trainerList = await this.trainerModel.find();
            for (const trainer of trainerList) {
                if (trainer.followers.findIndex(user => user.id == userId) == -1) {
                    trainers.push(trainer);
                }
            }
        }

        if (perpage) {
            if (!page) { page = 0; }
            trainers = trainers.slice((page * perpage), ((page + perpage) * perpage));
        }

        // if (trainers.length == 0) return Result.fail(new TrainerNotFoundException('No hay entrenadores'));
        if (trainers.length == 0) {throw new TrainerNotFoundException('No hay entrenadores')}

        const trainersDomain: Trainer[] = [];

        for (const trainer of trainers) {
            trainersDomain.push(await this.odmTrainerMapper.toDomain(trainer))
        }

        return Result.success(trainersDomain);
    }

    async countFollows(userId: UserId): Promise<Result<number>> {
        let trainers = await this.trainerModel.find({'followers.id': userId.Id});
        return Result.success<number>(trainers.length);
    }

    async saveTrainer(trainer: Trainer): Promise<void> {
        const trainerPers = await this.odmTrainerMapper.toPersistence(trainer);
        await this.trainerModel.create(trainerPers);
    }

}