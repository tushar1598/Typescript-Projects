import { Router } from "express";
const user = Router();
import {
  Createuser,
  Createsession,
  ForgotPassword,
  ResetPassword,
  EditProfile,
} from "../controllers/userController";

user.post("/create-user", Createuser);
user.post("/create-session", Createsession);
user.post("/forgot-password", ForgotPassword);
user.post("/reset-password", ResetPassword);
user.post("/update-profile", EditProfile);

export default user;
