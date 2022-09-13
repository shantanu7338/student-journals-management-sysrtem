import React from "react";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies=new Cookies();
const Teachernav=()=>
{
    const history=useHistory();
    return (
        <div className="flex justify-between bg-orange-500 px-3">
            <ul className="py-3 capitalize flex">
                <li className="hover:font-bold"><Link to="/teacherhome"><AddIcon fontSize="small"/>New Assignment</Link></li>&nbsp;&nbsp;
                <li className="hover:font-bold"><Link to="/Teacherjournals"><CheckIcon fontSize="small"/>Check Assignment</Link></li>&nbsp;&nbsp;
                <li className="hover:font-bold"><Link to="/Searchjournals"><SearchIcon fontSize="small"/> Search Journals</Link></li>
            </ul>
            <button className="hover:font-bold" onClick={(e)=>{e.preventDefault();cookies.remove('ttoken');history.push("/Teacherlogin");}}><ExitToAppIcon/>Logout</button>
        </div>
    );
}
export default Teachernav;