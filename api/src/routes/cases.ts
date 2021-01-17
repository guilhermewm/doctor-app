import express, { NextFunction, Request, Response } from "express";
import { CaseModel } from "../models/case";
import { ErrorHandler } from "../utils/ErrorHandler";

const router = express.Router();

router.get('/', [],  async (req: Request, res: Response, next: NextFunction) => {
    const isReviewed: boolean = (req.query.isReviewed == 'true');
    const query = req.query.isReviewed ? {'isReviewed': isReviewed} : {};

    const num: number = Number(req.query.number);
    try {
        let response = await CaseModel.find(query).populate('condition').populate('user', '_id name email date').exec();
        if (num) response = response.slice(0, num);
        return res.status(200).send(response);
    } catch(err) {
        return next(new ErrorHandler(422, err.toString()));
    }    
});

router.get('/:id', [],  async (req: Request, res: Response, next: NextFunction) => {
    const query = { _id: req.params.id };
    try {
        const response = await CaseModel.findOne(query).populate('condition').populate('user', '_id name email date').exec();
        return res.status(200).send(response);
    } catch(err) {
        return next(new ErrorHandler(422, err.toString()));
    }    
});

router.post('/', [],  async (req: Request, res: Response, next: NextFunction) => {
    const newCase = new CaseModel({...req.body});
    try {
        if (!newCase.description) return next(new ErrorHandler(400, 'Must have a description'));
        await newCase.save();
        return res.status(201).send({message: "Created!"});
    } catch(err) {
        return next(new ErrorHandler(422, err.toString()));
    }    
});

router.patch('/:id', [],  async (req: Request, res: Response, next: NextFunction) => {
    const query = { _id: req.params.id };
    const condition = req.body.conditionId;
    const user = req.body.userId;
    if (!req.params.id || !condition || !user) return next(new ErrorHandler(400, 'Bad Request'));
    try {        
        const findCase = await CaseModel.findOne(query).exec();
        if (!findCase) return next(new ErrorHandler(400, 'Case not found'));
        if (findCase.isReviewed) return next(new ErrorHandler(400, `This case was reviewed in ${findCase.updateTime}`));
       
        const update = await CaseModel.updateOne(query, {condition, user, updateTime: new Date(), isReviewed: true});
        return res.status(201).send({message: "Updated!"});
    } catch(err) {
        return next(new ErrorHandler(422, err.toString()));
    }    
});

router.delete('/:id', [],  async (req: Request, res: Response, next: NextFunction) => {
    const query = { _id: req.params.id };
    try {
        await CaseModel.deleteOne(query).exec();
        return res.status(200).send({message: "Deleted!"});
    } catch(err) {
        return next(new ErrorHandler(422, err.toString()));
    }    
});

export { router as caseRoutes };
