import jwt from "jsonwebtoken";

interface payload {
    userID: string;
    userName: string;
    userRole: number;
    userTheme: number;
}

export const tokenService = (payload: payload, rememberMe: boolean) => {
    const secretKey = process.env.SECRETKEY || 'your-secret-key';

    const accessTokenExpiration = '30m';
    const refreshTokenExpiration = rememberMe ? '30d' : '7d';

    const token = jwt.sign(payload,secretKey, {
        expiresIn: accessTokenExpiration,
    })
    
    const refreshToken = jwt.sign(payload, secretKey, {
        expiresIn: refreshTokenExpiration,
    })
    return {
        token,
        refreshToken
    }
}