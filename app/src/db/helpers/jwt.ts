import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET as string;
import * as jose from "jose"


export const signToken = (
    payload: {
        _id: string; email: string
    }
) => {
    return jwt.sign(payload, SECRET);
}

export const jwtVerify = (payload: string) => {
    return jwt.verify(payload, SECRET);
};

export const verifyJose = async <T>(payload: string) => {
    const secretKey = new TextEncoder().encode(SECRET);
    const payloadJose = await jose.jwtVerify<T>(payload, secretKey);

    return payloadJose.payload;
}