const mongoose = require("mongoose");
mongoose.pluralize(null);
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/CafesDB", { useUnifiedTopology: true , useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const cafeSchema = new mongoose.Schema({
    name:String,
    place_id:String,
    
});

const Cafes = mongoose.model("Cafes", cafeSchema);

const placeSchema = new mongoose.Schema({
    
    id:String,
    street_no:String,
    locality:String,
    postal_code:String,
    lat:String,
    long:String,
    
    
});

const Places = mongoose.model("Places", placeSchema);




module.exports = function(app){


    app.get("/",function(req,res){
        Cafes.find({},function(err,data){
            if(err)throw err;
            console.log(data);
            res.render("Cafes",{cafesData:data})
        });
    });

    app.post("/required",function(req,res){
        console.log(req.body.name);
        // console.log(req.body.)
        Cafes.find({name:req.body.name},function(err,data){
            if(err)throw err;
            console.log(data);
        })
    })

    app.get("/Cafes/:cafeId",function(req,res){
        console.log(req.params.cafeId);
        var CafeId = req.params.cafeId;

        Places.find({id:CafeId},function(err,data){
            if(err){
                console.log(err);             
            }else{
              console.log(data);
              Cafes.find({place_id:CafeId},function(err,Cafename){
                  if(err)throw err;
                  console.log(Cafename)
                  res.render ("cafeDetails",{docs:data,CAFEname:Cafename});
              })
               
            }
        });
        
    })

    


}