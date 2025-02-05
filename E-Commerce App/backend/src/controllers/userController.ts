import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../config/auth";
import nodemailer from "nodemailer";
import multer from "multer";
import fs from "fs";
import path from "path";

export const Createuser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, phone, password } = req.body;
  const Password = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      name,
      email,
      phone,
      password: Password,
      avatar: "/uploads/default.png",
    });
    res.status(201).json({ user, message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving user data", error });
  }
};

export const Createsession = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user !== null) {
    const Password = await bcrypt.compare(password, user.password);
    if (Password) {
      const Token = jwt.sign({ id: user._id, email: user.email }, "Tushar@123");
      res.status(200).json({
        Token,
      });
    } else {
      res.status(200).json({
        password: false,
      });
    }
  } else {
    res.status(200).json({
      username: false,
    });
  }
};

export const Protected = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  return res.status(200).json({
    message: "Authentication Successfull",
    user: req.user,
  });
};

export const ForgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "tsaini425@gmail.com",
        pass: "vmep qnou mvcq uhys",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    transporter.sendMail({
      from: user.email,
      to: "tsaini425@gmail.com",
      subject: "Password Reset Link",
      html: `http://localhost:5173/users/reset-password/${user._id}`,
    });
    return res.status(200).json({
      message: "Reset Password Link Sent Successfully!!",
      link: true,
    });
  }
  return res.status(200).json({
    message: "user is not found",
    link: false,
  });
};

export const ResetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id, password } = req.body;
  let Password = await bcrypt.hash(password, 10);
  let reset = await User.findByIdAndUpdate(id, { password: Password });
  return res.status(200).json({
    reset,
  });
};

// export const EditProfile = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const newImagePath = `/uploads/${req.file?.filename}`;
//   const { id, name, email, phone, password } = req.body;
//   const user = await User.findOne({ _id: id });
//   const oldImagePath = user?.avatar;

//   if (oldImagePath && oldImagePath !== newImagePath) {
//     const fullOldImagePath = path.join(__dirname, "..", oldImagePath);
//     fs.unlink(fullOldImagePath, (err) => {
//       if (err) {
//         console.error(`Failed to delete old image: ${err}`);
//       }
//     });
//   }
//   const updatedUser = await User.findByIdAndUpdate(
//     id,
//     { name, email, phone, password, avatar: newImagePath },
//     { new: true }
//   );
//   return res.status(200).json({
//     updatedUser,
//   });
// };

export const EditProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id, name, email, phone, password } = req.body;
  if (password.length) {
    const updatedData = await User.findByIdAndUpdate(id, {
      name,
      email,
      phone,
      password: await bcrypt.hash(password, 10),
    });
    return res.status(200).json({
      updatedData,
    });
  } else {
    const updatedData = await User.findByIdAndUpdate(id, {
      name,
      email,
      phone,
    });
    return res.status(200).json({
      updatedData,
    });
  }
};
