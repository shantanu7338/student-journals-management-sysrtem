import React, { useEffect, useState } from "react";
import Teachernav from "./Teachernav";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Teacherhome=()=>
{
    const [ainfo,setainfo]=useState({
        title:"",
        course:"",
        year:"",
        subject:"",
        duedate:"",
        file:""
    });
    const input=(e)=>
    {
        const {name,value}=e.target;
        setainfo({...ainfo,[name]:value});
    }
    const history=useHistory();
    const teachercookie=Cookies.get('ttoken');
    console.log(teachercookie);
    const submit=async(e)=>
    {
        e.preventDefault();
        let form = document.getElementById ('form');
        let formData = new FormData(form);
        // new line added
       await axios.post('http://localhost:5000/upload', formData).then((res)=>
       {
            alert(res.data.message);
            console.log("form file:-"+formData);
            console.log("file:-"+ainfo.file);
       });
    }
    useEffect(()=>
    {
        if(!teachercookie)
        {
            history.push("/Teacherlogin");
        }
    });
    return (
        <>
            <Teachernav/>
            <div className="flex justify-center my-3">
                <form className="w-2/6 border border-black p-2" encType="multipart/form-data" onSubmit={submit} id="form">
                    <h2 className="text-center font-bold text-2xl my-2 uppercase">create New Journal</h2>
                    <label>Title</label>
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" onChange={input}/>
                    <label>Course</label>
                    <select className="w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="course" onChange={input}>
                        <option>Select any option</option>
                        <option value="MCA">MCA</option>
                        <option value="MMS">MMS</option>
                    </select>
                    <label>Year</label>
                    <select className="w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="year" onChange={input}>
                        <option>Select any option</option>
                        <option value="First Year">First Year</option>
                        <option value="Second Year">Second Year</option>
                    </select>
                    <label>Subject</label>
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="subject" onChange={input}/>
                    <label>Journal Type</label>
                    <select className="w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="jt" onChange={input}>
                        <option>Select any option</option>
                        <option value="assignment">Assigment</option>
                        <option value="practical">Practical</option>
                    </select>
                    <label>Due Date</label>
                    <input type="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="date" onChange={input}/>
                    <label>Attach File</label>
                    <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="file" onChange={input}/>
                    <button className="bg-blue-500 rounded w-full my-3 p-2">Submit</button>
                </form>
            </div>
        </>
    );
}
export default Teacherhome;