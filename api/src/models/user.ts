import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
    @prop({ required: true })
    public name!: String;

    @prop({ required: true, unique: true })
    public email!: String;

    @prop({ required: true, minlength: 6 })
    public password!: String;

    @prop({ default: new Date()})
    public date!: Date;
}

export const userModel = getModelForClass(User);