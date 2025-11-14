import { connectDB } from "@/dbconfig/db"
import User  from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody);
        

        // check user exists
        const existingUser = await User.findOne({ email })
        if(!existingUser) {
            return NextResponse.json({ error: "User does not exists" }, { status: 400 })
        }

        // compare password
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if(!validPassword) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
        }
        
        // create token data
        const tokenData = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, { expiresIn: '2d' })

        const response = NextResponse.json({ success: true, message: "Login successful", token })
        response.cookies.set("token", token, { 
            httpOnly: true,  
        })
        return response;
    }
    catch (error: any) {
        return NextResponse.json({ message: "Login error", error: error.message }, { status: 500 })
    }
}

