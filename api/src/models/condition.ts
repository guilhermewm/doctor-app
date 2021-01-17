import { getModelForClass, prop } from "@typegoose/typegoose";

export class Condition {
    @prop({ required: true })
    public code!: String;

    @prop({ required: true })
    public description!: String;
}

export const ConditionModel = getModelForClass(Condition);