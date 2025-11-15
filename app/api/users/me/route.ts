import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connectDB } from "@/dbconfig/db";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({ message: "User found", data: user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error in fetching user data: " + error.message }, { status: 500 });
    }
}