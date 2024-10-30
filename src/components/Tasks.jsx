import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Form from "./Form";
import ShowTasks from "./ShowTasks";
import dayjs from "dayjs";
import CustomSidebar from "./CustomSidebar";

import todoData from '../data/todoData'


const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState(() => {
  
  
    const storedTasks = localStorage.getItem("task-manager");
    return storedTasks ? JSON.parse(storedTasks) : todoData;

});


// console.log(tasks.length)
// console.log(todoData);


useEffect(() => {
    localStorage.setItem("task-manager", JSON.stringify(tasks));
}, [tasks]);


  function openform() {
    setOpen(true);
  }

  const closeForm = () => {
    setOpen(false);
  };





  return (
    <div>

      

     <Button variant="contained" onClick={openform}>
        {" "}
        Assign Task
      </Button>
      {/* <button onClick={openform}>Assign Task</button> */}
      <Form
        open={open}
        handleClose={closeForm}
        tasks={tasks}
        setTasks={setTasks}
      />
      <ShowTasks tasks={tasks} setTasks={setTasks}/>

    </div>
  );
};

export default Tasks;
