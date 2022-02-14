import express from "express";
import cors from "cors";
import db from "./db/db.js";
import roleRouter from "./routes/roleRouter.js";
import bookRouter from "./routes/bookRouter.js";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/roles", roleRouter);
app.use ("/api/books", bookRouter );
app.use("/api/users", userRouter );
app.listen(process.env.PORT,()=>console.log("Backend server running on port: ",process.env.PORT));

db.dbConnection()