import { ValueObject } from "src/common/domain/value-object";
import { InvalidUserImageException } from "../exceptions/invalid-user-image.exception";

export class UserImage extends ValueObject<UserImage> {
    private readonly image: string;

    private constructor(image: string) {
        super();
        let valid: boolean = true;
        
        if (!image) valid = false;

        if (!valid) throw new InvalidUserImageException(`No existe la imagen`);

        this.image = image;
    }

    get Image(): string {
        return this.image;
    }

    equals(obj: UserImage): boolean {
        return this.image === obj.Image;
    }

    static create(image: string): UserImage {
        return new UserImage(image);
    }
}