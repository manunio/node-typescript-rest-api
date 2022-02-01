import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined): string {
    return jwt.sign(object, privateKey, {
        ...(options && options), // checks if options is undefined
        algorithm: "RS256"
    });
}

export interface JwtVerifyResponse {
    valid: boolean,
    expired: boolean,
    decoded?: null | string | jwt.JwtPayload
}

export function verifyJwt(token: string): JwtVerifyResponse {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null
        }
    }
}