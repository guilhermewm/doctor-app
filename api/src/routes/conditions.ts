import express, { NextFunction, Request, Response } from "express";
import { ConditionModel } from "../models/condition";
import { ErrorHandler } from "../utils/ErrorHandler";

const router = express.Router();

router.get('/', [],  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await ConditionModel.find().exec();
        return res.status(200).send(response);
    } catch(err) {
        return next(new ErrorHandler(422, err.toString()));
    }    
});

router.get('/:id', [],  async (req: Request, res: Response, next: NextFunction) => {
    const query = { _id: req.params.id };
    try {
        const response = await ConditionModel.findOne(query).exec();
        return res.status(200).send(response);
    } catch(err) {
        return next(new ErrorHandler(422, err.toString()));
    }    
});

router.post('/', [],  async (req: Request, res: Response, next: NextFunction) => {
    const newCase = new ConditionModel({...req.body});
    try {
        await newCase.save();
        return res.status(201).send({message: "Created!"});
    } catch(err) {
        return next(new ErrorHandler(422, err.toString()));
    }    
});

router.delete('/:id', [],  async (req: Request, res: Response, next: NextFunction) => {
    const query = { _id: req.params.id };
    try {
        await ConditionModel.deleteOne(query).exec();
        return res.status(200).send({message: "Deleted!"});
    } catch(err) {
        return next(new ErrorHandler(422, err.toString()));
    }    
});

export { router as conditionRoutes };
