import { Router } from "express";
const user = Router();
import {
  Createuser,
  Createsession,
  Protected,
  ForgotPassword,
  ResetPassword,
  EditProfile,
} from "../controllers/userController";
import { upload } from "../config/multer";
import verifyToken from "../config/auth";

user.post("/create-user", Createuser);
user.post("/create-session", Createsession);
user.get("/protected", verifyToken, Protected);
user.post("/forgot-password", ForgotPassword);
user.post("/reset-password", ResetPassword);
// user.post("/update-profile", upload, EditProfile);
user.post("/update-profile", EditProfile);

export default user;
