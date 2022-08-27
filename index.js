import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoute from "./Routes/AuthRoute.js";
import ProjectRoute from "./Routes/ProjectRoute.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Mongo is connected!");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.get("/", function (req, res) {
    res.send("This is Indian Freelancers API!");
});

app.use("/api", AuthRoute);

app.use("/api/client", ProjectRoute);

app.listen(PORT, () => {
    console.log("Server connected in " + PORT);
});