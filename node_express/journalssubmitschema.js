const mongoose=require("mongoose");

const submitjournal=new mongoose.Schema({
    student_id:
    {
        type:String,
        required:true
    },
    student_name:
    {
        type:String,
        required:true
    },
    journalno:{
        type:String,
        required:true
    },
    title:
    {
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    journaltype:{
        type:String,
        required:true
    },
    duedate:{
        type:String,
        required:true
    },
    submitdate:{
        type:String,
        required:true
    },
    files:[
        {
            filename:{
                type:String,
                required:true
            },
            filepath:{
                type:String,
                required:true
            }   
        }
    ]
});
const submitjournals=mongoose.model("managejournals",submitjournal);
module.exports=submitjournals;