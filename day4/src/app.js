const express= require("express")
const app=express();
app.use(express.json());


const notes=[]

app.post("/notes",(req,res)=>{
    res.send("notes created")
    notes.push(req.body)
    
    console.log(req.body);
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{
    console.log(req.params.index);
    console.log(req.params.index.body);

    delete notes[req.params.index]
    res.send("Node deleted successfully")
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description=req.body.description;
    console.log(notes)
    res.send("Notes updated successfully")
})
module.exports= app;