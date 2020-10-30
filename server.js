import express from "express";
import mongoose from "mongoose";

import Data from "./data.js";
import Videos from './dbModel.js';

// app config
const app = express();
const port = 9000;

// middleware
app.use(express.json())
//  ****** don't use in production ready app *********
app.use((req,res,next)=>{
    res.setHeaders('Access-Control-Allow-Origin','*'),
    res.setHeaders('Access-Control-Allow-Headers','*'),
    next()
})


// db config
const connection_url = process.env.connection_url;
mongoose.connect(connection_url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// api end point
app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.get("/v1/posts", (req, res) => {
  res.status(200).send(Data);
});

app.post("/v2/posts", (req, res) => {
    const dbVideos = req.body;
    Videos.create(dbVideos,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.get("/v2/posts",(req,res)=>{
    Videos.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

// listen
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});


