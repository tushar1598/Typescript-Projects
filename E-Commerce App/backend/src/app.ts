import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import routes from "./routes";
import path from "path";

const app = express();

const port = 5000;

app.use(cors());

app.use(express.json());

connectDB();

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", routes);

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in Creating Server`, err);
    return;
  }
  console.log(`Server is running successfully on port:: ${port}`);
});
