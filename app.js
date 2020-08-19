//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const datacontroller = require("./datacontroller/controller")


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//to view templates
app.set("view engine", "ejs");

app.use(express.static("Public"));


datacontroller(app);


app.listen(process.env.PORT || 3000,function(req,res){
    console.log("server running on port 3000.!");
});
