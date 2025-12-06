import { v4 as uuid } from "uuid";
import { Request, Response, NextFunction } from "express";

export function requestId(req: Request, res: Response, next: NextFunction) {
    req.headers["x-request-id"] = uuid();
    next();
}
