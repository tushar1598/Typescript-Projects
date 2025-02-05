import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = 5000;

app.use(cors());

app.use(express.json());

connectDB();

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running successfully on port:: ${port}`);
});
