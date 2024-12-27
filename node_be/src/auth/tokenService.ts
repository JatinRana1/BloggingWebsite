import jwt from "jsonwebtoken";
import { User } from "../model/user";
import bcrypt from "bcrypt";

interface Payload {
    userID: string;
    userName: string;
    userRole: number;
    userTheme: number;
}

export const generateTokens = async (payload: Payload, rememberMe: boolean) => {
    try {
        const accessKey = process.env.ACCESS_TOKEN_KEY!;
        const refreshKey = process.env.REFRESH_TOKEN_KEY!;
        
        if (!accessKey || !refreshKey) {
            throw new Error("Token keys are missing in environment variables.");
        }

        const accessTokenExpiration = "30m";
        const refreshTokenExpiration = rememberMe ? "30d" : "7d";

        const refreshToken = jwt.sign(payload, refreshKey, {
            expiresIn: refreshTokenExpiration,
        });

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        const user = await User.findOneAndUpdate(
            { _id: payload.userID },
            { refreshToken: hashedRefreshToken }
        );

        if (!user) {
            throw new Error("User not found.");
        }

        const accessToken = jwt.sign(payload, accessKey, {
            expiresIn: accessTokenExpiration,
        });

        return { accessToken, refreshToken };
        
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new Error("Failed to generate tokens.");
    }
};

export const newRefreshToken = async (refreshToken: string) => {
    try {
        const refreshKey = process.env.REFRESH_TOKEN_KEY!;

        if (!refreshKey) throw new Error("Refresh key is missing.");

        const decoded = jwt.verify(refreshToken, refreshKey) as Payload;

        const user = await User.findById(decoded.userID);

        if (!user) throw new Error("User not found.");
        if (!user.refreshToken) throw new Error("Refresh token is not set.");

        const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isMatch) throw new Error("Invalid refresh token.");

        const accessKey = process.env.ACCESS_TOKEN_KEY!;
        const accessToken = jwt.sign(decoded, accessKey, { expiresIn: "30m" });

        return { accessToken };
        
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw new Error("Failed to refresh token.");
    }
};
