import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("DB Connected Successfully!!!");
        });

        connection.on("error", (err) => {
            console.log("DB Connection Failed!!!");
            console.log(err);
            process.exit();
        });

    } catch (error) {
        console.log("DB Connection Error!!!");
        console.log(error);
    }

}