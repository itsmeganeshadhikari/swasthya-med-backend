import Express from "express";
import userRouter from "./routes/user.route.js";



const app = Express();
app.use(Express.json());

app.use("/api/user", userRouter);

app.listen(3000, () => {
    console.log("server listening on port 3000");
});