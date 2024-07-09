import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
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

    @Prop({type: [{type: mongoose.Schema.Types.Mixed}]})
    followers: OdmUserEntity[];

    static create(id: string, name: string, location: string, followers: OdmUserEntity[]) {
        const odm = new OdmTrainerEntity();
        odm.id = id;
        odm.followers = followers;
        odm.location = location;
        odm.name = name;
        return odm;
    }
}

export const TrainerSchema = SchemaFactory.createForClass(OdmTrainerEntity);