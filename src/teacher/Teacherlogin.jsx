import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import '../student/login.css';
import Cookies from "universal-cookie";
const cookies=new Cookies();
const Teacherlogin=()=>
{
    const [logininfo,setlogininfo]=useState({
        tid:"",
        tpass:""
    });
    const usehistory=useHistory();
    const input=(e)=>
    {
        const {name,value}=e.target;
        setlogininfo({...logininfo,[name]:value});
    }
    const submit=(e)=>
    {   
        e.preventDefault();
        const {tid,tpass}=logininfo;
        if(tid==="teacher" && tpass==="123456")
        {
            alert("successfully login");
            cookies.set('ttoken',tid,{path:'/'});
            usehistory.push("/teacherhome");
        }
        else
        {
            alert("invalid credentials");
        }
    }
    return (
            <div className="login grid place-items-center bg-gradient-to-br from-blue-300 to-orange-300" style={{"width":"100%","height":"100vh"}}>
            <form onSubmit={submit} method="POST" className="grid place-items-center h-96 w-96 py-3 px-5 bg-white">
            <h2 className="text-2xl">Teacher Login</h2>
               <img src="https://th.bing.com/th/id/R.8cece1e0f4c58da5fdd5387b69a651c5?rik=XDTwtBi0%2b5PImg&riu=http%3a%2f%2fwww.kbw.com.sg%2frobocorp_website%2fstatic%2fsrc%2fimg%2fabout%2fdirector.png&ehk=KWDg7oKZ1ORvu%2fF74z2hshczVGQhGJ23k6xpEtITf2Q%3d&risl=&pid=ImgRaw&r=0" className="w-24" alt="avtar"/>
               <input type="text" placeholder="Teacher id" className="input" onChange={input} name="tid" value={logininfo.tid}/>
               <input type="password" placeholder="Password" className="input" onChange={input} name="tpass" value={logininfo.tpass}/>
               <button>Login</button>
            </form>
        </div>
    );
}
export default Teacherlogin;