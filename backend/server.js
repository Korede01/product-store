import express from "express";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/products.route.js"


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const __dirname = path.resolve();

app.use("/api/products", productRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

