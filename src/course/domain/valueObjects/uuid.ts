export class Uuid {
  readonly value: string;

  constructor(value: string) {

    this.value = value;
  }


  private checkUuidValidity(uuid: string): boolean {
    if (uuid.length != 36) {return false};
    
    if (uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i) == null) {
      return false;
    }

    return true;
  }
}