import {Request, Response} from "express";
import logger from "../utils/logger";
import {createUser, validatePassword} from "../service/user.service";
import {CreateUserInput} from "../schema/user.schema";
import {omit} from "lodash";
import {createSession, findSession, updateSession} from "../service/session.service";
import {signJwt} from "../utils/jwt.utils";
import config from "config";

export async function createSessionHandler(req: Request, res: Response): Promise<any> {
    // validate user password
    const user = await validatePassword(req.body);
    if (!user) return res.status(401).send("Invalid email or password");

    // create a session
    const session = await createSession(user._id, req.get("userAgent") || "");

    // create access token
    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("accessTokenTtl")} // 15 minutes
    );

    // create a refresh token
    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("accessTokenTtl")} // 15 minutes
    );

    // return access & refresh tokens
    res.send({accessToken, refreshToken});
}

export async function getUserSessionsHandler(req: Request, res: Response): Promise<any> {
    const userId = res.locals.user._id;
    const sessions = await findSession({user: userId, valid: true})
    return res.send(sessions)
}

export async function deleteSessionHandler(req: Request, res: Response): Promise<any> {
    const sessionId = res.locals.user.session

    await updateSession({_id: sessionId}, {valid: false})

    return res.send({
        accessToken: null,
        refreshToken: null
    })
}