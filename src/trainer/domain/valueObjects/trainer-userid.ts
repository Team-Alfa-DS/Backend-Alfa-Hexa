import { ValueObject } from "src/common/domain/value-object";
import {EmptyuserIdExceptionTrainer} from '../exceptions/empty-trainer-userid-exception';
import { UserId } from "src/user/domain/value-objects/user-id";


export class TrainerFollowerUserId extends ValueObject<TrainerFollowerUserId>{
    private readonly userId: UserId[];

    private constructor(userId: UserId[]) {
    

        if (!userId) throw new EmptyuserIdExceptionTrainer("El id de usuario no existe");
        super();
        this.userId = userId //*Esto funciona para que no pueda ser modificado
    }

    get trainerFollowerUserId(): UserId[]{
        return this.userId
    }

    equals(obj: TrainerFollowerUserId): boolean {
        return this.userId === obj.userId;
    }
    public static create(userId: UserId[]): TrainerFollowerUserId {
        return new TrainerFollowerUserId(userId);
    }
}