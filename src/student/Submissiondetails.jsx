import React, { useEffect, useState } from "react";
import Studentnav from "./Studentnav";
import axios from "axios";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
const Submissiondetails=()=>
{
    const [studeninfo,setstudentinfo]=useState([]);
    const [info1,setinfo1]=useState([]);
    const usehistory=useHistory();
    const cookie=Cookies.get('jwttoken');
    const sessioncheck=async()=>
    {
        console.log(Cookies.get('jwttoken'));
        await axios.post("http://localhost:5000/submissiondetails",{
            cookie
        }).then((res)=>
        {
            console.log("exist:-"+res.data.exist);
          //  console.log(res.data.stud);
            setstudentinfo(res.data.stud);
            setinfo1(res.data.submission);
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

    const tbody=(val)=>
    {
    return(
        <tr className="hover:bg-yellow-200">
                <td className="border border-black border-collapse py-2">{val.course}</td>
                <td className="border border-black border-collapse py-2">{val.journaltype}</td>
                <td className="border border-black border-collapse py-2">{val.subject}</td>
                <td className="border border-black border-collapse py-2">{val.title}</td>
                <td className="border border-black border-collapse py-2">{val.year}</td>
                <td className="border border-black border-collapse py-2">{val.duedate}</td>
                <td className="border border-black border-collapse py-2">{val.submitdate}</td>
                <td className="border border-black border-collapse py-2"><a href={"."+val.files[0].filepath} target="_blank" className="text-white bg-blue-500 py-1 px-3">view attachment</a></td>
        </tr>
    );
    }
    if(cookie)
    {
        return (
            <>
            <Studentnav name={studeninfo.student_name}/>
            <div className="float-left w-4/5 p-3">
                    <h2 className="font-bold text-xl uppercase mb-2 border-b-2">Submission Details</h2>
                    <div className="table w-full mt-2">
                    <table className="w-full capitalize border border-black border-collapse text-center">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="border border-black border-collapse py-2">course</th>
                                <th className="border border-black border-collapse py-2">journal type</th>
                                <th className="border border-black border-collapse py-2">subject</th>
                                <th className="border border-black border-collapse py-2">title</th>
                                <th className="border border-black border-collapse py-2">year</th>
                                <th className="border border-black border-collapse py-2">due date</th>
                                <th className="border border-black border-collapse py-2">submission date & Time</th>
                                <th className="border border-black border-collapse py-2">attachment</th>
                            </tr>
                        </thead>
                    <tbody>
                        {info1.map(tbody)}
                    </tbody>
                </table>
                </div>
            </div>
            </>
        );
    }
    else{
        return (<></>);
    }
}
export default Submissiondetails;