import express from "express"
import { register, login, currentUser } from "../controllers/authController.js";
import validateToken from "../middlewares/validateToken.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/current", validateToken, currentUser);

export default authRouter;