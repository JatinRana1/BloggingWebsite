import { number, string } from "joi";
import jwt from "jsonwebtoken";

interface payload {
    userID: string;
    userName: string;
    userRole: number;
    userTheme: number;
}

export const tokenService = (payload: payload) => {
    const secretKey = process.env.SECRETKEY || 'your-secret-key';

    const token = jwt.sign(payload,secretKey, {
        expiresIn: '30m',
    })

    const refreshToken = jwt.sign(payload, secretKey, {
        expiresIn: '7d',
    })
    return {
        token,
        refreshToken
    }
}