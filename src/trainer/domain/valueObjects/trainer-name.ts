import { ValueObject } from "src/common/domain/value-object";
import { InvalidTrainerNameException } from "../exceptions/invalid-trainer-name-exception";
import { EmptyTrainerNameException } from "../exceptions/empty-trainer-name-exception";


export class TrainerName extends ValueObject<TrainerName> {
    private readonly name: string;
    
    private constructor(name: string) {
        super();
        const patron = /^[a-zA-Z0-9]+$/;
        
        if (!name ) throw new EmptyTrainerNameException( "El nombre del entrenador esta vacio" );
        if (!patron.test(name)) throw new InvalidTrainerNameException( `El nombre del entrenador ${name} no puede 
            tener caracteres especiales` );

        this.name = Object.freeze(name); //*Esto funciona para que no pueda ser modificado
    }

    get trainerName(): string {
        return this.name;
    }
    
    equals(obj: TrainerName): boolean {
        return this.name === obj.name;
    }

    public static create(name: string): TrainerName {
        return new TrainerName(name);
    }
}