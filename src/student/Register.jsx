import React, { useState } from "react";
import { Link, useHistory} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
const Register=()=>
{
    const useHistory1=useHistory();
    const [sinfo,setsinfo]=useState({
        sid:"",
        sname:"",
        semail:"",
        sphone:"",
        course:"",
        year:"",
        pass:"",
        cpass:""
    });
    const input=(event)=>
    {
       const {name,value} =event.target;
       setsinfo({...sinfo,[name]:value});
    }
    
    const submit=async(e)=>
    {
       e.preventDefault();
       if(sinfo.pass===sinfo.cpass)
       {
            try
            {
                await axios.post("http://localhost:5000/register",sinfo).then((res)=>
                {
                    alert(res.data.message);
                    if(res.data.message!=="Student already registered")
                    {
                        useHistory1.push("/");
                    }
                });
            }
            catch(err)
            {
                alert("something went wrong");
                console.log(err);
            }
       }
       else
       {
           alert("password and confirm password mismacth");
       }
    }
    return (
        <div className="login flex justify-center items-center bg-gradient-to-br from-blue-300 to-orange-300" style={{"height":"100vh","width":"100%"}}>
           <form onSubmit={submit} method="POST" className="grid place-items-center w-96 bg-white py-3 px-5" style={{"height":"500px"}}>
                <h3 className="capitalize text-2xl">Student registration</h3>
                <input type="text" placeholder="Student id" value={sinfo.sid} className="input" name="sid" onChange={input} required/>
                <input type="text" placeholder="Student Full name" value={sinfo.sname} className="input" name="sname" onChange={input} required/>
                <select className="input" onChange={input} name="course" required>
                    <option>Select Course</option>
                    <option value="MCA">MCA</option>
                    <option value="MMS">MMS</option>
                </select>
                <select className="input" onChange={input} name="year" required>
                    <option>Select Year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                </select>
                <input type="email" placeholder="Email Address" className="input" value={sinfo.semail} name="semail" onChange={input} required/>
                <input type="text" placeholder="Phone Number" className="input" value={sinfo.sphone} name="sphone" onChange={input} required/>
                <input type="password" placeholder="Password" className="input" value={sinfo.pass} name="pass" onChange={input} required/>
                <input type="password" placeholder="Confirm Password" className="input" value={sinfo.cpass} name="cpass" onChange={input} required/>
                <button>Register</button>
                <Link to="/" className="underline"><ArrowBackIcon/>Back to login</Link>
           </form>
        </div>
    );
}
export default Register;