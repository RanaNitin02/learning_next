import { connectDB } from "@/dbconfig/db"
import User  from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

connectDB()

export async function POST(req: NextRequest) {
    try {
        
        const reqBody = await req.json();
        const {username, email, password} = reqBody

        if( !username || !email || !password ) {
            return NextResponse.json({ error: "Please fill all the fields" }, { status: 400 })
        }

        console.log(reqBody);

        // check user exists
        const existingUser = await User.findOne({ email })
        if(existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);
        
        return NextResponse.json({ success: true, message: "User created successfully", user: savedUser  })

    } catch (error: any) {
        return NextResponse.json({ error: "Signup error" }, { status: 500 })
    }
}