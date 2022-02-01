import SessionModel, {SessionDocument} from "../models/session.model";
import {FilterQuery, UpdateQuery} from "mongoose";

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({user: userId, userAgent});
    return session.toJSON();
}

export async function findSession(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean(); // lean returns plain old object
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update);
}