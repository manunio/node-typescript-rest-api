import {NextFunction, Request, Response} from "express";
import {get} from "lodash";
import {verifyJwt} from "../utils/jwt.utils";
import logger from "../utils/logger";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
        if (!accessToken) return next()

        const {decoded, expired} = verifyJwt(accessToken)
        if (decoded) {
            res.locals.user = decoded
            return next()
        }
        // just to avoid hanging
        return next()
    } catch (error) { // fail safe
        logger.error(error)
        return next()
    }

}
export default deserializeUser