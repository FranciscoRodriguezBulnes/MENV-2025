import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import cookieParser from "cookie-parser";
import redirectRouter from "./routes/redirect.route.js";

const app = express();

const whiteList = [process.env.ORIGIN1,process.env.ORIGIN2];

// app.use(
//   cors({
//     origin: [process.env.ORIGIN1]
//   })
// );


 app.use(
   cors({
    origin: function (origin, callback) {
      if (whiteList.includes(origin)) {
        return callback(null, origin);
       }
       return callback("Error de CORS: " + origin + " no autorizado");
     },
   })
 );

// dotenv.config();
app.use(express.json());
app.use(cookieParser());
//ejemplo de redirect backend (opcional)
app.use("/", redirectRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);

//solo para servir archivos estáticos en la carpeta public y para el ejemplo de frontend (login y token)
// app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port 5000 🌹🌹🌹 http://localhost:" + PORT);
});

// app.use(cors());
// app.use(express.json());
