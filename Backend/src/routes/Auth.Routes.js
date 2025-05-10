import express from "express";
import { login, me, register } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const routes = express.Router()

routes.post('/login',login)
routes.post('/register',register)
routes.get('/me',authMiddleware,me)

export default routes;