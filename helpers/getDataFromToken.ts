import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async(request: NextRequest) => {
    try {
        const token = await request.cookies.get("token")?.value || "";
        const decodedToken: any = await jwt.verify(token, process.env.JWT_TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error("Error in getting data from token: " + error.message);
    }
}