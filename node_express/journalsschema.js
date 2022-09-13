const mongoose=require("mongoose");

const journals=new mongoose.Schema({
    journalno:
    {
        type:String,
        required:true
    },
    title:{
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

const journal=mongoose.model("Journals",journals);
module.exports=journal;
