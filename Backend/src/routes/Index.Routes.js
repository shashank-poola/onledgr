import express from "express";
import authRoutes from "./Auth.Routes.js";
import blogRoutes from './Blog.Routes.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/blog",authMiddleware,blogRoutes)

export default routes;
