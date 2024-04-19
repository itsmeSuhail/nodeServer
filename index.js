import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDb } from "./utils/ConnectDb.js"
import globalError from "./utils/CustomError/error.controller.js"
import { mongoURL, port } from "./utils/dev.env.js";


const app = express();
const key = mongoURL;
connectDb(key);
app.use(cors({
	origin: "http://localhost:4200", credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "server is  working" })
})

app.use(globalError);
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
})