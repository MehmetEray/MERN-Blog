import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
const app = express();
dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 5000;

var con =
    "mongodb+srv://mehmeteray:mehmeteray123@cluster0.cpokm.mongodb.net/blogify?retryWrites=true&w=majority";
mongoose.connect(con, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});


app.use("/posts", postRoutes);
app.listen(process.env.PORT, function () {
    console.log("Server is running on Port: " + process.env.PORT);
});
mongoose.set("useFindAndModify", false);
