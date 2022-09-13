import './App.css';
import Head from './Head';
import Signin from './student/Signin';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Register from './student/Register';
import Studenthome from './student/Studenthome';
import Manageassignments from './student/Manageassigments';
import Teacherlogin from './teacher/Teacherlogin';
import Teacherhome from './teacher/Teacherhome';
import Searchjournals from './teacher/Searchjournals';
import Teacherjournals from './teacher/Teacherjournals';
import FileView from './FileView';
import Submissiondetails from './student/Submissiondetails';

function App() {
  return (
   <>
    <Head/>
    <Switch>
      <Route exact path="/" component={Signin}/>        
      <Route exact path="/register" component={Register}/>
      <Route exact path="/Studenthome" component={Studenthome}/>
      <Route exact path="/Assignment" component={Manageassignments}/>
      <Route exact path="/Submissiondetails" component={Submissiondetails}/>
      <Route exact path="/teacherlogin" component={Teacherlogin}/>
      <Route exact path="/teacherhome" component={Teacherhome}/>
      <Route exact path="/Searchjournals" component={Searchjournals}/>
      <Route exact path="/Teacherjournals" component={Teacherjournals}/>
      <Route exact path="/Fileview" component={FileView}/>
    </Switch>
   </>
  );
}

export default App;
