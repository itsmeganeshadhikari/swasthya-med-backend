import Express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./routes/user.route.js";
import errorMiddleware from "./middleware/error.js";
import mongoose from "mongoose";
dotenv.config();



const app = Express();

app.use(Express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", router);

mongoose.connect(process.env.MONGO)
    .then(() => { console.log("Connected to MongoDB"); })
    .catch(() => { console.log("Could not connect to MongoDB"); });

app.use(errorMiddleware);


app.listen(3000, () => {
    console.log("server listening on port 3000"); 
});

