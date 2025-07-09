import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import routs from "./routes/routs.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 


mongoose.connect(process.env.DB_URL)
.then(() => console.log("MongoDB Atlas Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));


app.use("/api/products", routs);

app.get("/", (req, res) => {
  res.send("Backend is live with MongoDB Atlas");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});