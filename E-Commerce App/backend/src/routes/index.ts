import { Router } from "express";
const router = Router();
import user from "./user";

router.use("/users", user);

export default router;
