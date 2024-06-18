import { ValueObject } from "src/common/domain/value-object";

export class Url extends ValueObject<Url> {
  private readonly url: string;

  constructor(value: string) {
    super();

    if (!value) { /* throw DomainException NullUrlException */};

    if (!value.includes('.')) { /* throw DomainException InvalidUrlException */}

    this.url = value;
  }

  equals(obj: Url): boolean {
    return this.url === obj.url;
  }

}