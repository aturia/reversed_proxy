import { logger } from "../lib/logger";
import { Request, Response, NextFunction } from "express";

export function logRequest(req: Request, res: Response, next: NextFunction) {
    const id = req.headers["x-request-id"]

    logger.info({
        requestId: id,
        method: req.method,
        url: req.url,
        headers: req.headers
    });

    next();
}