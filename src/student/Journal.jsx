import React from "react";
import { Link } from "react-router-dom";
import DescriptionIcon from '@material-ui/icons/Description';
const Journal=(val)=>
{
    let file="";
    const submit=(e)=>
    {
        e.preventDefault();
        const journalno=val.journalno;
        const title=val.title;
        const duedate=val.duedate;
        const subject=val.subject;
        console.log(journalno+" "+title+" "+duedate+" "+subject);
        console.log(file);
    }
    const file1=(e)=>
    {
        file=e.target.value;
    }
    return (
        <>
        <form className="border border-black p-2 my-1" onSubmit={submit}>
           <h3 className="font-bold">{val.title}</h3>
           <h3 className="text-base capitalize">Subject:-{val.subject}</h3>
            <h4 className="capitalize text-base my-1">due date {val.duedate}</h4>
            <h4 className="text-lg my-1">Referance materials</h4>
            <a href={"."+val.files[0].filepath} target="_blank" className="text-sm font-bold border border-black py-2 px-4 rounded"><DescriptionIcon fontSize="small"/>&nbsp;{val.files[0].filename}</a>
            <h4 className="text-lg mt-1">My work</h4>
            <input type="file" className="shadow appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={file1}/>
            <button className="bg-green-500 text-white mx-2 py-2 px-3 rounded">Submit</button>
           </form>
        </>
    );
}
export default Journal;