const mongoose=require("mongoose");
const db="mongodb+srv://shantanu:shantanu@cluster0.myl4c.mongodb.net/college?retryWrites=true&w=majority";
mongoose.connect(db).then(()=>
{
        console.log("connection successful");
 }).catch((e)=>
{
        console.log("not connected try again later",e);
});