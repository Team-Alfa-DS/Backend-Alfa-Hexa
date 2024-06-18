import { ValueObject } from "src/common/domain/value-object";
import { EmptyTrainerLocationException } from "../exceptions/empty-trainer-location-exception";
import { InvalidTrainerLocationException } from "../exceptions/invalid-trainer-location-exception";


export class TrainerLocation extends ValueObject<TrainerLocation> {
    private readonly location: string;
    
    private constructor(location: string) {
        super();
        const patron = /^[a-zA-Z0-9,-\/]+$/;
        
        if (!location ) throw new EmptyTrainerLocationException( "La ubicacion del trainer esta vacia" );
        if (!patron.test(location)) throw new InvalidTrainerLocationException( `La ubicacion del trainer ${location} no puede 
            tener caracteres especiales` );

        this.location = Object.freeze(location); //*Esto funciona para que no pueda ser modificado
    }

    get trainerLocation(): string {
        return this.location;
    }
    
    equals(obj: TrainerLocation): boolean {
        return this.location === obj.location;
    }

    public static create(location: string): TrainerLocation {
        return new TrainerLocation(location);
    }
}