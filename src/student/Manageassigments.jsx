import React, { useEffect, useState } from "react";
import Studentnav from "./Studentnav";
import axios from "axios";
import Cookies from 'js-cookie';
import DescriptionIcon from '@material-ui/icons/Description';
let sinfo=[];
const Journal=(val)=>
{
    let file1="";
    const submit=async(e)=>
    {
        e.preventDefault();
        const journalno=val.journalno;
        const title=val.title;
        const duedate=val.duedate;
        const subject=val.subject;
        const course=val.course;
        const year=val.year;
        const journaltype=val.journaltype;
        console.log(journalno+" "+title+" "+duedate+" "+subject);
        console.log(sinfo);
        let form1 = document.getElementById('form1');
        let formData1 = new FormData(form1);
        await axios.post('http://localhost:5000/submitjournals',{
                journalno,
                title,
                duedate,
                subject,
                course,
                year,
                sinfo,
                journaltype,
                file1,
        }).then((res)=>
        {
            alert(res.data.message);
            console.log("file:-"+file1);
            console.log("form file:-"+formData1);
            journalsubmit();
        });

        const journalsubmit=async()=>
        {
            console.log("journals submit");
            await axios.post('http://localhost:5000/journalsubmit',formData1).then((res)=>
            {
                alert(res.data.journalsubmit);
            });
        }
    }
    const filejournal=(e)=>
    {
        file1=e.target.files;
        console.log(file1);
    }
    return (
        <>
        <form className="border border-black p-2 my-1" encType="multipart/form-data" onSubmit={submit} id="form1">
           <h3 className="font-bold">{val.title}</h3>
           <h3 className="text-base capitalize">Subject:-{val.subject}</h3>
            <h4 className="capitalize text-base my-1">due date {val.duedate}</h4>
            <h4 className="text-lg my-1">Referance materials</h4>
            <a href={"."+val.files[0].filepath} target="_blank" className="text-sm font-bold border border-black hover:bg-yellow-200 py-2 px-4 rounded"><DescriptionIcon fontSize="small"/>&nbsp;{val.files[0].filename}</a>
            <h4 className="text-lg mt-1">My work</h4>
            <input type="file" className="shadow appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="managefile" onChange={filejournal} required/>
            <button className="bg-green-500 text-white mx-2 py-2 px-3 rounded">Submit</button>
        </form>
        </>
    );
}
const Manageassignments=()=>
{
    const cookie=Cookies.get('jwttoken');
    const [journals,setjournals]=useState([]);
    const [studentinfo,setstudentinfo]=useState([]);
    const getjournals=async()=>
    {
        await axios.post("http://localhost:5000/verify",{
            cookie
        }).then((res)=>
        {
            console.log(res.data.stud);
            console.log(res.data.journals);
            sinfo=res.data.stud;
            setjournals(res.data.journals);
            setstudentinfo(res.data.stud);
        });
    }
    useEffect(()=>
    {
       getjournals();
    },[]);
    if(cookie)
    {
        return (
            <>
                <Studentnav name={studentinfo.student_name}/>
                <div className="text-xl w-4/5 float-left assigment p-2">
                    <h2 className="font-bold uppercase border-b-2">Manage Assigments</h2>
                    {journals.map(Journal)}
                </div>

            </>
        );
    }
    else
    {
        return (<></>);
    }
}
export default Manageassignments;