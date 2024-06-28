import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { OdmUserEntity } from "src/user/infraestructure/entities/odm-entities/odm-user.entity";

@Schema({collection: 'trainer'})
export class OdmTrainerEntity {
    @Prop({required: true, unique: true, type: Types.UUID})
    id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: false})
    location: string;

    @Prop({type: [mongoose.Schema.Types.Mixed]})
    followers: OdmUserEntity[];
}

export const TrainerSchema = SchemaFactory.createForClass(OdmTrainerEntity);