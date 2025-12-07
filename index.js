import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";

const app = express();
// dotenv.config();
app.use(express.json());
app.use("/api/v1", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port 5000 🌹🌹🌹 http://localhost:" + PORT);
});

// app.use(cors());
// app.use(express.json());
