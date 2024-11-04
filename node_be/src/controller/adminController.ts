import { Response, Request } from "express"
import { User } from "../model/user";
import bcrypt from "bcrypt";
import Joi from "joi";
import { tokenService } from "../auth/tokenService";

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean(),
})

export const adminController = {
    login: async (req: Request, res: Response)=>{    
        try {
            const { error, value } = loginSchema.validate(req.body);

            if(error){
                return res.status(400).json({message: error.details[0].message});
            }

            const { email, password, rememberMe } = value;
            
            const user = await User.findOne({email: email});

            if(!user || !password){
                return res.status(404).json({email: "User Not Found"})
            }

            if(user.status != 1){
                return res.status(403).json({email: "Your Account is Inactive"})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(401).json({password: "Invalid credentials"});
            }

            
            const payload = {
                userID: user.id,
                userName: user.name,
                userRole: user.role,
                userTheme: user.theme_preference,
            }

            const {token, refreshToken} = tokenService(payload, rememberMe);

            res.cookie('access_token', token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 60 * 1000
            });

            const cookieExpiration = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: cookieExpiration
            });
            
            return res.status(200).json({token});

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Internal Server Error"});
        }
    },
}