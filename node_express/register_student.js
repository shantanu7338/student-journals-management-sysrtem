const mongoose=require("mongoose");
const bhash=require("bcryptjs");
const jwt=require("jsonwebtoken");
const schema=new mongoose.Schema({
    student_id:
    {
        type:Number,
        required:true,
        unique:true
    },
    student_name:
    {
        type:String,
        required:true
    },
    year:
    {
        type:String,
        required:true
    },
    course:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    phone:
    {
        type:Number,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    tokens:
    [
        {
            token:
            {
                type:String,
                required:true
            }
        }
    ]
    
});
//hashing password 
schema.pre('save',async function(next)
{
    if(this.isModified('password'))
    {
        this.password=await bhash.hash(this.password,10);
        next();
    }
});
//generating token
schema.methods.generateAuthToken=async function()
{
    try
    {
        let secretkey="studentjouranalsmanagementsystemwebportal";
        let generatetoken=jwt.sign({_id:this._id},secretkey);
        this.tokens=this.tokens.concat({token:generatetoken})
        await this.save();
        return generatetoken;
    }
    catch(err)
    {
        console.log(err);
    }
}
const register=mongoose.model("Student_regitser",schema);
//export module
module.exports=register;