import React, { useState } from "react";
import '../student/login.css';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import Cookies from 'universal-cookie';
const cookies=new Cookies();
const Signin=()=>
{
    const usehistory=useHistory();
    const [signinfo,setsignin]=useState({
        sid:"",
        pass:""
    });
    const input=(e)=>
    {
        const {name,value}=e.target;
        setsignin({...signinfo,[name]:value});
    }
    const signin=async(e)=>
    {
        e.preventDefault();

        await axios.post("http://localhost:5000/login",signinfo).then((res)=>
        {
            alert(res.data.message);
            if(res.data.message==="Login sucessfully")
            {
                const token=res.data.tokenp;
                cookies.set("jwttoken",token,{ path: '/' });
                usehistory.push("/Studenthome");
            }
        });
    }
    return (
        <div className="login grid place-items-center bg-gradient-to-br from-blue-300 to-orange-300" style={{"width":"100%","height":"100vh"}}>
            <form onSubmit={signin} method="POST" className="grid place-items-center h-96 w-96 py-3 px-5 bg-white">
            <h2 className="text-2xl">Student Login</h2>
               <img src="https://th.bing.com/th/id/R.8cece1e0f4c58da5fdd5387b69a651c5?rik=XDTwtBi0%2b5PImg&riu=http%3a%2f%2fwww.kbw.com.sg%2frobocorp_website%2fstatic%2fsrc%2fimg%2fabout%2fdirector.png&ehk=KWDg7oKZ1ORvu%2fF74z2hshczVGQhGJ23k6xpEtITf2Q%3d&risl=&pid=ImgRaw&r=0" className="w-24" alt="avtar"/>
               <input type="text" placeholder="Student id" className="input" onChange={input} name="sid" value={signinfo.sid}/>
               <input type="password" placeholder="Password" className="input" onChange={input} name="pass" value={signinfo.pass}/>
               <button>Login</button>
               <Link to="/register" className="underline">not an account?create one</Link>
            </form>
        </div>
    );
}
export default Signin;