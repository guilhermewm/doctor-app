import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user";
import { ErrorHandler } from "../utils/ErrorHandler";
import { loginValidator, registerValidator, validateInfo } from "../utils/validations";

const router = express.Router();

router.post('/login', [],  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateInfo(loginValidator, req.body);
    console.log(error);
    if (error) return next(new ErrorHandler(400, error.details[0].message));

    try {        
        const user = await userModel.findOne({ email: req.body.email}).exec();
        if (!user) return next(new ErrorHandler(400, "Email is wrong"));

        const validPassword = await bcrypt.compare(req.body.password, user.password.toString());
        if (!validPassword)  return next(new ErrorHandler(400, "Password is wrong"));

        // create token
        const token = jwt.sign({
                name: user.name,
                id: user._id,
            },
            process.env.TOKEN_SECRET!
        );

        return res.status(201).header("auth-token", token).send({message: "Login successful", token});
    } catch(err) {
        return next(new ErrorHandler(422, err.toString()));
    }    
});

router.post("/register", [], async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateInfo(registerValidator, req.body);
    if (error) return next(new ErrorHandler(400, error.details[0].message));
    try {
        const validateEmail = await userModel.findOne({ email: req.body.email }).exec();
        if (validateEmail) return next(new ErrorHandler(400, "Email already exists"));

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const newUser = new userModel({...req.body, password});
        const response = await newUser.save();
        return res.status(201).send({message: "User registered!"});
    } catch (err) {
        return next(new ErrorHandler(422, err.toString()));
    }
  });

export { router as authRoutes };
