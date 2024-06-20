import { Entity } from "./entity";
import { ValueObject } from "./value-object";

export abstract class AggregateRoot<T extends ValueObject<T>> extends Entity<T> {

    protected constructor(id: T) {
        super(id);
    }
}