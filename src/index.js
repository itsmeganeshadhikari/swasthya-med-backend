import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => { console.log("connected to mongoDB"); })
    .catch(() => { console.log("couldn't connect to mongoDB"); });

const app = Express();

app.use(Express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
    console.log("server listening on port 3000");
});