const express=require("express");
const app=express();
const cors=require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt=require("bcryptjs");
const jwttoken=require("jsonwebtoken");
require("./mongoconn");
const multer= require('multer');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
//register student collection
const register=require('./register_student');
//journals collection
const journal = require("./journalsschema");
//submit journals
const submitjournal = require("./journalssubmitschema");
//auth
const auth=require("./auth");
//routes register
app.post("/register",async(req,res)=>
{
   const studentexist= await register.findOne({student_id:req.body.sid});
   if(studentexist)
   {
       res.send({message:"Student already registered"});
   }
   else
   {
       try
       {
           const student_info=new register({
               student_id:req.body.sid,
               student_name:req.body.sname,
               email:req.body.semail,
               course:req.body.course,
               year:req.body.year,
               phone:req.body.sphone,
               password:req.body.pass
           });
           student_info.save((err)=>
           {
               if(err)
               {
                   res.send({message:"error"});
                   console.log(err);
               }
               else
               {
                   res.send({message:"succeessfully registered"});
               }
           });
       }
       catch(err)
       {
           console.log(err);
       }
   }
});

app.post("/login",async(req,res)=>
{
    const sid=req.body.sid;
    const pass=req.body.pass;
    console.log(pass);
    let token;
    try
    {
        const studentexist=await register.findOne({student_id:sid});
        if(studentexist)
        {
           const passwordverify=await bcrypt.compare(pass,studentexist.password);
           if(passwordverify)
           {
                token =await studentexist.generateAuthToken();
               // console.log(token);
             /*  const cookies=res.cookie('jwttoken',token,{
                    expires:new Date(Date.now()+2589200000),
                    httpOnly:true
                });
                console.log(cookies);
               */ 
                res.send({message:"Login sucessfully",tokenp:token});
           }
           else
           {
               res.send({message:"Password is invalid"});
           }
        }
        else
        {
            res.send({message:"Student not register or student id not valid"});
        }
    }
    catch(err)
    {
        console.log(err);
    }
});
let fileext="";
let fileext1="";
  //strorage engine 1 for multer
  const storageEngine1 = multer.diskStorage ({
    destination: '../react/journals/public/submitjournals/',
    filename: (req, file, callback)=> {
        callback (
          null,
       req.body.sinfo.student_id+'-'+req.body.title+'-'+req.body.subject+"-"+req.body.journalno+""+req.body.course+path.extname(file.originalname)
        );
      },
  });
   // file filter for multer
   const fileFilter = (req, file, callback) => {
    let pattern = /pdf|doc|docx/; // reqex
    if (pattern.test(path.extname(file.originalname))) {
      callback (null, true);
      fileext=path.extname(file.originalname);
      fileext1=path.extname(file.originalname);
    } else {
      res.send({message:"file is not valid"});
    }
  };
  //multer 1
  const upload1 = multer ({
    storage: storageEngine1,
    fileFilter: fileFilter,
  });
//submit journals
  app.post("/journalsubmit",upload1.single("managefile"),(req,res)=>
  {
        res.send({journalsumit:"File uploaded"});
        console.log("journal submit");
  });
  app.post("/submitjournals",async(req,res)=>
  {
      const filename1=req.body.sinfo.student_id+'-'+req.body.title+'-'+req.body.subject+"-"+req.body.journalno+"-"+req.body.course+fileext1;
      const filepath="./submitjournals/"+filename1;
      const submitdate=new Date();
      var day = ("0" + submitdate.getDate()).slice(-2);
      var month = ("0" + (submitdate.getMonth() + 1)).slice(-2);
      var year = submitdate.getFullYear();
      var hours = submitdate.getHours();
      var minutes = submitdate.getMinutes();
      var seconds = submitdate.getSeconds();
  
      var timedate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
      console.log("file:-"+req.body.file1[0]);
      //console.log("form body:-"+req.body);
     // file1=req.body.file;
     const checkjournals=await submitjournal.findOne({student_id:req.body.sinfo.student_id,journalno:req.body.journalno});
     if(!checkjournals)
     {
        try
        {
            const submit=new submitjournal({
                student_id:req.body.sinfo.student_id,
                student_name:req.body.sinfo.student_name,
                journalno:req.body.journalno,
                title:req.body.title,
                course:req.body.course,
                year:req.body.year,
                subject:req.body.subject,
                journaltype:req.body.journaltype,
                duedate:req.body.duedate,
                submitdate:timedate,
                files:[
                   {
                      filename:filename1,
                      filepath:filepath
                   }
                ]
            });
            submit.save((err)=>{
              if(err)
              {
                  res.send({message:"something went wrong try again"});
              }
              else
              {
                  res.send({message:"successfully submitted"});
              }
          }); 
        }
        catch(err)
        {
            console.log(err);
        }
     }
     else
     {
         res.send({message:"Journal already submitted"});
     }
  });
// storage engine for multer
const storageEngine = multer.diskStorage ({
    destination: '../react/journals/public/journals/',
    filename: (req, file, callback)=> {
        callback (
          null,
       req.body.title+'-'+req.body.course+'-'+req.body.subject+path.extname(file.originalname)
        );
      },
  });
  // initialize multer
  const upload = multer ({
    storage: storageEngine,
    fileFilter: fileFilter,
  });
// routing
app.post('/upload',upload.single('file'),(req,res) => {
    console.log("hello");
    const filename=req.body.title+'-'+req.body.course+'-'+req.body.subject+fileext;
    console.log(filename);
    const filepath="./journals/"+filename;
    console.log(filepath);
    console.log("file upload:-"+req.file);
    const assignno=Math.floor(Math.random()*10000);
    try
    {
        const journal1=new journal({
            journalno:assignno,
            title:req.body.title,
            course:req.body.course,
            year:req.body.year,
            subject:req.body.subject,
            journaltype:req.body.jt,
            duedate:req.body.date,
            files:[ 
                {
                    filename:filename,
                    filepath:filepath
                } 
            ]
        });
        journal1.save((err)=>{
            if(err)
            {
                res.send({message:"something went wrong try again"});
            }
            else
            {
                res.send({message:"successfully submitted"});
            }
        });
    }
    catch(err)
    {
        res.send({message:"something went wrong"});
    }
  });

app.post("/search",async(req,res)=>
{
    console.log("hello");
    try
    {
        const search=await journal.find({course:req.body.course,year:req.body.year,subject:req.body.subject});
        if(search)
        {
            console.log("find");
            console.log(search);
            res.send({info:search});
        }
    }
    catch(err)
    {
        console.log(err);
    }
});
app.post("/check",async(req,res)=>
{
    try
    {
        const search=await submitjournal.find({course:req.body.course,year:req.body.year,subject:req.body.subject,title:req.body.title});
        if(search)
        {
            console.log("find");
            console.log(search);
            res.send({info:search});
        }
    }
    catch(err)
    {
        console.log(err);
    }
});
app.post("/submissiondetails",auth,async(req,res)=>
{
    console.log("submission details");
    const res1=await submitjournal.find({student_id:req.studid});
    try
    {
        if(res1)
        {
           /* console.log("find details");
            console.log(req.studid);
            console.log(res1);
            */
            res.send({exist:req.exist,stud:req.stud,submission:res1});
        }
    }
    catch(err)
    {
        console.log(err);
    }
});
app.post("/verify",auth,async(req,res)=>
{
    console.log("manage assignment");
    console.log(req.body.cookie);
    try
    {
        const search=await journal.find({course:req.course});
        console.log("auth course:-"+req.course);
        if(search)
        {
            console.log("find");
            console.log(search);
            res.send({exist:req.exist,stud:req.stud,journals:search});
        }
    }
    catch(err)
    {
        console.log(err);
    }
});
app.post("/studenthome",auth,(req,res)=>
{
    res.send({exist:req.exist,stud:req.stud});
})
app.listen(5000);