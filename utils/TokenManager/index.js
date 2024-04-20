import jwt from "jsonwebtoken";
import { JwtSecret } from "../dev.env.js";
export const CreatToken = (obj) => {
    return jwt.sign(obj, JwtSecret, { expiresIn: "1d" });
}
export const CreatTokenWithTime = (obj, time) => {
    return jwt.sign(obj, JwtSecret, { expiresIn: time });
}
export const verifyTokenWithTime = (Token) => {
    try {
        const check = jwt.verify(Token, JwtSecret);
        return check ? check : null;
    } catch (error) {
        return null;
    }
}

export const verifyToken = (Token) => {
    try {
        const check = jwt.verify(Token, JwtSecret, { expiresIn: "1d" });
        return check ? check : null;
    } catch (error) {
        return null;
    }
}
