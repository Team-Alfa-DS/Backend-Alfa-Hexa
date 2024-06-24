import { ValueObject } from "src/common/domain/value-object";
import { EmptyTrainerIdException } from "../exceptions/empty-trainer-id-exception";


export class TrainerId extends ValueObject<TrainerId> {
    private readonly id: string;
    
    
    private constructor(id: string) {
        super();
        
        let valid: boolean = true;
        
        if (!id ) valid = false;
        if (!valid) throw new EmptyTrainerIdException("El id no existe");
        
        this.id = Object.freeze(id); //*Esto funciona para que no pueda ser modificado
    }

    get trainerId(): string {
        return this.id;
    }
    
    equals(obj: TrainerId): boolean {
        return this.id === obj.id;
    }

    public static create(id: string): TrainerId {
        return new TrainerId(id);
    }
}