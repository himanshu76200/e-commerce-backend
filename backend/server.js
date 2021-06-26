import express from 'express';
import products from './data/products.js' // need to have .js for ES5 module
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import colors from "colors";

dotenv.config();

connectDB()

const app = express();

app.get("/", (req, res) => {
    res.json("API is running...")
})

app.get("/api/products", (req, res) => {
    res.json(products)
})

app.get("/api/product/:id", (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    if (product) {
        res.json(product)
    }
    res.json("Product not found")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold ));