import { Router } from "express";
import Alert from "../services/alert.service.js";

const AlertRoute = Router();

AlertRoute.post("/alert/:userId", async (req, res) => {
    const { userId } = req.params;
    const { latitude, longitude } = req.body;

    const alert = await Alert.handleUserAlert(userId, { latitude, longitude });

    res.send(alert)

})

export default AlertRoute;