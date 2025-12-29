import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import usersRouter from './routers/usersRouter.js';
import myProfileRouter from './routers/myProfileRouter.js';
import authRouter from "./routers/authRouter.js";
import postsRouter from "./routers/postsRouter.js"
import onboardRouter from "./routers/onboardRouter.js";

dotenv.config();

const app = express();

const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const corsOptions = {
    origin: allowedOrigin, 
    credentials: true 
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json())
app.use(cookieParser());

app.use("/api/users", usersRouter)

app.use("/api/myprofile", myProfileRouter)

app.use("/api/auth", authRouter)

app.use("/api/posts", postsRouter)

app.use("/api/onboard", onboardRouter)

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});