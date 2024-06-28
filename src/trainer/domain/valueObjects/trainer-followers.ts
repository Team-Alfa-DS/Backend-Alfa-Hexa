import { ValueObject } from "src/common/domain/value-object";
import { InvalidTrainerFollowersException } from "../exceptions/invalid-trainer-followers-exception";
import { EmptyTrainerFollowerException } from "../exceptions/empty-trainer-follower-exception";


export class TrainerFollower extends ValueObject<TrainerFollower> {
    private readonly followers: number;
    
    
    private constructor(followers: number) {
        super();
        
        if ((followers === undefined) || (followers === null)) throw new EmptyTrainerFollowerException( "El valor de los seguidores no puede estar vacio" );
        if (isNaN(followers)) throw new InvalidTrainerFollowersException( "El valor que esta entrando no es un numero" );
        
        this.followers = Object.freeze(followers); //*Esto funciona para que no pueda ser modificado
    }

    get trainerFollower(): number {
        return this.followers;
    }
    
    equals(obj: TrainerFollower): boolean {
        return this.followers === obj.followers;
    }

    public static create(followers: number): TrainerFollower {
        return new TrainerFollower(followers);
    }
}