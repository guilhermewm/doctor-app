import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Condition } from "./condition";
import { User } from "./user";

class Case {
    @prop({ required: true })
    public description!: String;

    @prop({ default: false })
    public isReviewed!: Boolean;

    @prop({ ref: () => Condition})
    public condition?: Ref<Condition>;

    @prop({ ref: () => User})
    public user?: Ref<User>;
    
    @prop()
    public updateTime?: Date;
}

export const CaseModel = getModelForClass(Case);