import React from "react";
import "./App.css";
import Tasks from "./components/Tasks";
import Users from "./components/Users";
import Home from "./components/Home";
import CustomSidebar from "./components/CustomSidebar";
function App() {


      //side bar props

      const sidebar=[
        {label:'Home',value:'Home'},
        {label:'Services',value:['App Development','Cloud Management','Website Development']},
        {label:'About Us',value:'About Us Page'},
        {label:'Contact Us',value:'Contact Us Page'},                                  
        {label:'Logout',value:'Logout '}
      ]
  
  return (
    <>
      <div>
      <CustomSidebar values={sidebar}/>
<br /><br></br>

        <h1 className="heading">Manage Your Projects</h1>

        <Tasks />

        {/* <Users /> */}

        {/* <Home /> */}
      </div>
    </>
  );
}

export default App;
