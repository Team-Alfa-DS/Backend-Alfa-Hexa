import { ValueObject } from "../../../../src/common/domain/value-object";
import { EmptyTrainerUserFollowerException } from "../exceptions/empty-trainer-userFollower-exceptio";


export class TrainerUserFollow extends ValueObject<TrainerUserFollow> {
    private readonly userFollow: boolean;
    
    
    private constructor(userFollow: boolean) {
        super();
     
        if (!userFollow) throw new EmptyTrainerUserFollowerException( "El ususario seguidos no existe" );
        
        this.userFollow = Object.freeze(userFollow); //*Esto funciona para que no pueda ser modificado
    }

    get trainerUserFollow(): boolean {
        return this.userFollow;
    }
    
    equals(obj: TrainerUserFollow): boolean {
        return this.userFollow === obj.userFollow;
    }

    public static create(userFollow: boolean): TrainerUserFollow {
        return new TrainerUserFollow(userFollow);
    }
}