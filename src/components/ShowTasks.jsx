import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "Low":
      return "#fff58f";
    case "Medium":
      return "#ffad57";
    case "High":
      return "#ff6a6a";
    default:
      return "white";
  }
};

const ShowTasks = ({ tasks, setTasks }) => {
  const [completedTasks, setCompletedTasks] = useState({});
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle toggling of task completion status
  const handleToggle = (taskId) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));


  };

  // Handle removal of a task
  const handleRemove = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("task-manager", JSON.stringify(updatedTasks));
  };

  // Filter tasks based on priority and search term
  const filteredTasks = tasks.filter((task) => {
    const matchPriority = priorityFilter
      ? task.selectedPriority === priorityFilter
      : true;
    const matchSearch =
      task.taskname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.dev_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchPriority && matchSearch;
  });

  return (
    <div>
      <h1 className="projects">Projects</h1>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search tasks"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2, width: "400px" }}
        />
<FormControl
  variant="outlined"
  sx={{
    mb: 2,
    minWidth: 200,
    float: { sm: 'right', md: 'right' }, // Float right on sm and md screens
    width: {
      xs: '70%', // 70% width on extra small screens (e.g., mobile)
      sm: '40%', // 40% width on small screens and larger
      md: '40%', // 40% width on medium screens and larger
    },
    minWidth:'40%'

  }}
>      <InputLabel id="priority-select-label">Sort by priority</InputLabel>
      <Select
        labelId="priority-select-label"
        id="priority-select"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        label="Sort by priority"
        sx={{
          width: '40%', 
        }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </Select>
    </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: 1,
          padding: 2,
          flexWrap: "wrap",
          marginBottom: 4,
        }}
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              sx={{
                minWidth: 300,
                padding: 5,  
                background: getPriorityColor(task.selectedPriority),
                opacity: completedTasks[task.id] ? 0.5 : 1,
                transition: "opacity 0.3s ease",
                boxShadow: "1px 3px 5px gray",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {task.taskname}
                </Typography>
                <Typography>Developer: {task.dev_name}</Typography>
                <Typography>Priority: {task.selectedPriority}</Typography>
                <Typography>
                  Start Date:{" "}
                  {task.startDate
                    ? dayjs(task.startDate).format("YYYY-MM-DD")
                    : "N/A"}
                </Typography>
                <Typography>
                  End Date:{" "}
                  {task.endDate
                    ? dayjs(task.endDate).format("YYYY-MM-DD")
                    : "N/A"}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                onClick={() => handleToggle(task.id)}
                sx={{ marginTop: 2 }}
              >
                {completedTasks[task.id] ? "Not Done" : "Done"}
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "red", color: "white", mt: 2, ml: 3 }}
                onClick={() => handleRemove(task.id)}
              >
                Remove
              </Button>
            </Card>
          ))
        ) : (
          <span style={{ color: "gray", fontSize: "1.5rem" }}>
            No Data Found
          </span>
        )}
      </Box>
    </div>
  );
};

export default ShowTasks;
