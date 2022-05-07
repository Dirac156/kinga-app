import { Router } from "express";
import userRouters from "./user.route.js";
import alertRouters from "./alert.route.js";

const routers = Router();

routers.use("/", userRouters);

routers.use("/", alertRouters);

export default routers;