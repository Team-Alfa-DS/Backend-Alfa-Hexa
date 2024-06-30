import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { UserRole } from "src/user/domain/enums/role-user.type";

@Schema({collection: 'user'})
export class OdmUserEntity {
    @Prop({unique: true, required: true, type: Types.UUID})
    id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    phone: string;

    @Prop({required: true, enum: UserRole, default: UserRole.CLIENT})
    type: UserRole;

    @Prop({required: false})
    image?: string;

    static create (id: string, email: string, name: string, password: string, phone: string, type: UserRole, image: string) {
        const odmUser = new OdmUserEntity();
        odmUser.id = id;
        odmUser.email = email;
        odmUser.name = name;
        odmUser.password = password;
        odmUser.phone = phone;
        odmUser.type = type;
        odmUser.image = image;
        return odmUser;
    }
}

export const UserSchema = SchemaFactory.createForClass(OdmUserEntity);