import { ValueObject } from "src/common/domain/value-object";

export class Uuid extends ValueObject<Uuid> {
  private readonly id: string;

  constructor(value: string) {
    super();

    if (!value) {/* throw DomainException NullUuidException */} //TODO: si vamos a usar esto faltan las excepciones de dominio

    if (!this.checkUuidValidity(value)) {/* throw DomainException InvalidUuidException*/}

    this.id = value;
  }

  equals(object: Uuid): boolean {
    return this.id === object.id;
  }

  private checkUuidValidity(uuid: string): boolean {
    if (uuid.length != 36) {return false};
    
    if (uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i) == null) {
      return false;
    }

    return true;
  }
}