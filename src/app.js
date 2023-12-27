import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/error.js";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
dotenv.config();

export const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: [
//       'http://localhost:3000',
//       'https://arunchapagain-ebpearls.netlify.app',
//     ],
//     credentials: true,
//     exposedHeaders: ['refreshtoken', 'accesstoken'],
//   })
// )

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', 'http://shikshya.crews.draftserver.com:5025');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Expose-Headers", "accessToken, refreshToken,");
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET, OPTIONS"
    );
    return res.status(200).json({});
  }

  return next();
});

app.use((req, res, next) => {
  if (process.env.MODE === "maintenance") {
    return res.status(503).send({
      message: "This site is under maintenance.Please come back soon",
    });
  }
  next();
});
// TODO: Implement cors policy

// app.use(
//   session({
//     secret: 'stjdjkajdfka',
//     resave: false,
//     saveUninitialized: true,
//   })
// )
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Could not connect to MongoDB");
  });

app.use(errorMiddleware);
