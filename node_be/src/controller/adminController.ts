import { Response, Request } from "express"
import { User } from "../model/user";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const adminController = {
    login: async (req: Request, res: Response)=>{    
        try {
            const { error, value } = loginSchema.validate(req.body);
            
            if(error){
                return res.status(400).json({message: error.details[0].message});
            }

            const { email, password } = value;
            
            const user = await User.findOne({email: email});

            if(!user || !password){
                return res.status(404).json({email: "User Not Found"})
            }

            if(user.status > 1){
                return res.status(403).json({email: "Your Account is Inactive"})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(401).json({password: "Invalid credentials"});
            }

            const secretKey = process.env.SECRETKEY || 'your-secret-key';
            
            const payload = {
                userID: user.id,
                userName: user.name,
                userEmail: user.email,
                userRole: user.role,
                userTheme: user.theme_preference,
            }

            const token = jwt.sign(payload,secretKey, {
                expiresIn: '2h',
            })

            res.cookie('token', token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 2 * 60 * 60 * 1000
            });
            

            return res.status(200).json({message: 'Authenticated'});

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Internal Server Error"});
        }
    },
}