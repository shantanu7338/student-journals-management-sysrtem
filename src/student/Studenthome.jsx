import React, { useEffect, useState } from "react";
import Studentnav from "./Studentnav";
import axios from "axios";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
const Studenthome=()=>
{
    const [studeninfo,setstudentinfo]=useState([]);
    const usehistory=useHistory();
    const cookie=Cookies.get('jwttoken');
    const sessioncheck=async()=>
    {
        console.log(Cookies.get('jwttoken'));
        await axios.post("http://localhost:5000/studenthome",{
            cookie
        }).then((res)=>
        {
            console.log("exist:-"+res.data.exist);
          //  console.log(res.data.stud);
            setstudentinfo(res.data.stud);
            if(res.data.exist!=="student cookie")
            {
                usehistory.push("/");
            }
            
        });
    }
    useEffect(()=>
    {
        sessioncheck();
    },[]);
    if(cookie)
    {
        return (
            <>
                <Studentnav name={studeninfo.student_name}/>
                <div className="profile border border-black float-left w-4/5 p-3" style={{"height":"55vh"}}>
                    <h2 className="font-bold text-xl uppercase mb-2 border-b-2">Personal Information</h2>
                    <div className="profile-info capitalize">
                        <label className="font-bold">Student id</label><br/>
                        <label>{studeninfo.student_id}</label><br/>
                        <label className="font-bold">Student name</label><br/>
                        <label>{studeninfo.student_name}</label><br/>
                        <label className="font-bold">Email Address</label><br/>
                        <label className="lowercase">{studeninfo.email}</label><br/>
                        <label className="font-bold">Phone</label><br/>
                        <label>{studeninfo.phone}</label><br/>
                        <label className="font-bold">Course</label><br/>
                        <label>{studeninfo.course}</label><br/>
                        <label className="font-bold">Year</label><br/>
                        <label>{studeninfo.year}</label>
                    </div>
                </div>
            </>
        );
    }
    else{
        return (<></>);
    }
}
export default Studenthome;