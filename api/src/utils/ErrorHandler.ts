import { Response } from 'express';

export class ErrorHandler extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super();

        this.status = status;
        this.message = message;
    }
}

export const handleError = (err: ErrorHandler, res: Response) => {
    const { status, message } = err;
    res.status(status).json({
        status,
        message
    })
} 