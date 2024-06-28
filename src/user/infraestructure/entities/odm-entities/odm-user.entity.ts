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
}

export const UserSchema = SchemaFactory.createForClass(OdmUserEntity);