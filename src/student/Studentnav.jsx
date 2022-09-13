import React from "react";
import { Link, useHistory } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookies from "universal-cookie";
const cookies=new Cookies();
const Studentnav=(props)=>
{
    const usehistory=useHistory();
    return (
        <>
            <div className="student_nav flex justify-between uppercase p-2 bg-blue-500">
                <h5 className="w-2/4 font-bold">Student name:-{props.name}</h5>
                <button className="hover:text-white" onClick={(e)=>{e.preventDefault();cookies.remove('jwttoken');usehistory.push("/");}}><ExitToAppIcon/>Logout</button>
            </div>
            <div className="sidemenu bg-blue-500 w-1/5 border border-black float-left">
                <ul className="uppercase">
                   <li className="border border-black p-2 hover:text-white"><Link to="/Studenthome">Personal information</Link></li>
                   <li className="border border-black p-2 hover:text-white"><Link to="/Assignment">manage Journals</Link></li> 
                   <li className="border border-black p-2 hover:text-white"><Link to="/Submissiondetails">Submissions deatils </Link></li>  
                </ul>
            </div>
        </>
    );
}
export default Studentnav;