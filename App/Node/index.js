// const express = require("express");
import express from "express";
import userRoute from "./router/user.route.js";

const app = express();
const port = 5555;

app.use(express.json());

app.get("/get-api", (req, res)=>{
    console.log("hello");
    res.send("Hello");
});

app.get("/get-api", (req, res)=>{
// console.log(req.body);

const {name, phone, email, password, role} = req.body;
res.send(`your name: ${name}`);

});


app.listen(port, ()=>{
    console.log(`Server is started at http://localhost:${port}`);

});