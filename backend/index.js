import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "express-async-errors";

import Movies from "./routes/movies.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://localhost:27017/102141";
const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "Poza CORS";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());


mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Połączono z MongoDB!");
  })
  .catch((error) => {
    console.error("Błąd podczas łączenia z MongoDB:", error);
  });


app.use("/api/movies", Movies);


app.listen(PORT, () => {
  console.log(`Serwer działa na porcie: ${PORT}`);
});
