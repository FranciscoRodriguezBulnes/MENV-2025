import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';


const app = express();
// dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);

//solo para servir archivos estáticos en la carpeta public y para el ejemplo de frontend (login y token)
app.use(express.static("public"));  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port 5000 🌹🌹🌹 http://localhost:" + PORT);
});

// app.use(cors());
// app.use(express.json());
