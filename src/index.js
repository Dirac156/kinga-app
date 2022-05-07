import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectToDb } from "./config/connect.js";
import routers from "./api-routes/_index.js";
import { http } from "./helpers/http.js";
import { States } from "./helpers/global.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(routers);

const PORT = process.env.PORT || 4000

let server;
// connect to database: server run after database connection was established
connectToDb()
    .then(() => {
        console.log("Connection to database successded");
        server = app.listen(PORT, (err) => {
            if (err) { console.log("Application Error",  err); throw err }
            else { console.log('Up and ruining'); }
        });
        States.updateGlobalVariables({ dbConnection: true, apiConnection: true });
    });

app.get("/", (_, res) => {
    if (process.env.NODE_ENV === "development") {
        return res.status(http.status.ok).json({
            API_STATUS: true,
            DATABSE_CONNECTION: dbConnection.status
        })
    } else {
        return res.status(http.status.ok).json({
            API_STATUS: true,
        })
    }
})



