import { Model } from "mongoose";
import { Result } from "src/common/domain/result-handler/result";
import { IOdmTrainerRepository } from "src/trainer/domain/repositories/odm-trainer-repository.interface";
import { Trainer } from "src/trainer/domain/trainer";
import { TrainerId } from "src/trainer/domain/valueObjects/trainer-id";
import { UserId } from "src/user/domain/value-objects/user-id";
import { OdmTrainerEntity } from "../entities/odm-entities/odm-trainer.entity";
import { IMapper } from "src/common/application/mappers/mapper.interface";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";

export class OdmTrainerRepository implements IOdmTrainerRepository{

    private readonly trainerModel: Model<OdmTrainerEntity>;
    private readonly userModel: Model<OdmUserEntity>;
    private readonly odmTrainerMapper: IMapper<Trainer, OdmTrainerEntity>;

    constructor(trainerModel: Model<OdmTrainerEntity>, odmTrainerMapper: IMapper<Trainer, OdmTrainerEntity>, userModel: Model<OdmUserEntity>) {
        this.trainerModel = trainerModel;
        this.odmTrainerMapper = odmTrainerMapper;
        this.userModel = userModel;
    }

    async findTrainerById(id: TrainerId): Promise<Result<Trainer>> {
        let trainerId = id.trainerId;

        const trainer = await this.trainerModel.findOne({id: trainerId});

        if (!trainer) {
            return Result.fail<Trainer>(new Error('Trainer not found'));
        }

        const trainerDomain = await this.odmTrainerMapper.toDomain(trainer);
        const oneTrainer = Result.success<Trainer>(trainerDomain);
        return oneTrainer;
    }

    async followTrainer(trainer: Trainer): Promise<void> {
        const trainerOdm = await this.odmTrainerMapper.toPersistence(trainer);

        const users: OdmUserEntity[] = [];
        for (const user of trainer.User) {
            const userFound = await this.userModel.findOne({id: user.trainerFollowerUserId.Id})
            users.push(userFound);
            await this.userModel.updateOne({id: user.trainerFollowerUserId.Id}, {trainers: [...userFound.trainers, trainerOdm]})
        }

        await this.trainerModel.updateOne({id: trainer.Id.trainerId}, {followers: users});
    }

    async findAllTrainers(userfollow?: boolean, userId?: string, page?: number, perpage?: number): Promise<Result<Trainer[]>> {
        let trainers = []

        if (userfollow) {
            trainers = (await this.userModel.findOne({id: userId})).trainers;
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

        if (trainers.length == 0) return Result.fail(new Error('No hay entrenadores'));

        const trainersDomain: Trainer[] = [];

        for (const trainer of trainers) {
            trainersDomain.push(await this.odmTrainerMapper.toDomain(trainer))
        }

        return Result.success(trainersDomain);
    }

    async countFollows(userId: UserId): Promise<Result<number>> {
        let user = await this.userModel.findOne({id: userId.Id});
        return Result.success<number>(user.trainers.length);
    }

}