const jwt=require("jsonwebtoken");
const student=require("./register_student");
let course="";
const auth=async(req,res,next)=>
{
    console.log(req.body.cookie);
    try
    {
        if(req.body.cookie)
        {
            const token=req.body.cookie;
            const secret="studentjouranalsmanagementsystemwebportal";
            const verify=jwt.verify(token,secret);
            const stud=await student.findOne({_id:verify._id,"tokens.token":token});
            if(stud)
            {
                // res.send({exist:"student cookie",stud:stud,journals:req.journal});
                 req.exist="student cookie";
                 req.studid=stud.student_id;
                 req.stud=stud;
                 req.course=stud.course;   
                 course=stud.course;
                next();
            }
        }
        else
        {
                res.send({exist:"student not exist"});
        }
    }
    catch(err)
    {
        console.log(err);
    }
}
module.exports=auth;