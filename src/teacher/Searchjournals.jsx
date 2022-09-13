import axios from "axios";
import React, { useEffect, useState } from "react";
import Teachernav from "./Teachernav";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
const Searchjournals=()=>
{
    const [search,searchinfo]=useState({
        course:"",
        year:"",
        subject:""
    });

    const [info1,setinfo]=useState([]);
    const input=(e)=>
    {
        const {name,value}=e.target;
        searchinfo({...search,[name]:value});
    }
    const history=useHistory();
    const teachercookie=Cookies.get('ttoken');
    useEffect(()=>
    {
        if(!teachercookie)
        {
            history.push("/Teacherlogin");
        }
    });
    const search1=async(e)=>
    {
        e.preventDefault();
        await axios.post('http://localhost:5000/search',search).then((res)=>
        {
           // console.log(res.data.info);
            setinfo(res.data.info);
            console.log(info1);
        });
    }

    const tbody=(val)=>
    {
        return (
            <tr className="hover:bg-yellow-200">
                <td className="border border-black border-collapse py-2">{val.course}</td>
                <td className="border border-black border-collapse py-2">{val.journaltype}</td>
                <td className="border border-black border-collapse py-2">{val.subject}</td>
                <td className="border border-black border-collapse py-2">{val.title}</td>
                <td className="border border-black border-collapse py-2">{val.year}</td>
                <td className="border border-black border-collapse py-2">{val.duedate}</td>
                <td className="border border-black border-collapse py-2"><a href={"."+val.files[0].filepath} target="_blank" className="text-white bg-blue-500 py-1 px-3">view attachment</a></td>
            </tr>
        );
    }
    return (
        <>
            <Teachernav/>
            <div className="w-full border border-black py-2">
                <form className="w-2/3 mx-auto px-20" method="POST" onSubmit={search1}>
                    <h2 className="font-bold text-2xl text-center uppercase my-2">Search Journals</h2>
                    <label>Course</label>&nbsp;
                    <select name="course" onChange={input} className=" bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option>Select any option</option>
                        <option value="MCA">MCA</option>
                        <option value="MMS">MMS</option>
                    </select>&nbsp;
                    <label>Year</label>&nbsp;
                    <select name="year" onChange={input} className=" bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option>Select any option</option>
                        <option value="First Year">First Year</option>
                        <option value="Second Year">Second Year</option>
                    </select>&nbsp;
                    <label>Subject</label>&nbsp;
                    <input type="text" name="subject" onChange={input} className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />&nbsp;&nbsp;
                    <button className="bg-blue-500 py-2 px-4 my-2 rounded">Search</button>
                </form>
            </div>
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
                            <th className="border border-black border-collapse py-2">attachment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info1.map(tbody)}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Searchjournals;