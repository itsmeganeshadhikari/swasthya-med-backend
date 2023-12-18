import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/user.route";
dotenv.config();

mongoose.connect(process.env.MONGO)      //connection to mongoDB
    .then(() => { console.log("connected to mongoDB"); })
    .catch(() => { console.log("couldn't connect to mongoDB"); });

const app = Express();

app.use(Express.json());

app.use(cookieParser());



app.use("/api/user", router);


app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return
        res
            .status(statusCode)
            .json({
                    success: false,
                    statusCode,
                    message,
                });
});

app.listen(3000, () => {
    console.log("server listening on port 3000"); 
});

