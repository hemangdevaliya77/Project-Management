import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import '../App.css';
import CustomSidebar from './CustomSidebar';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Form = ({ open, handleClose, setTasks }) => {
    const [priorityOption] = useState(["Low", "Medium", "High"]);
    const [formdata, setFormdata] = useState({
        taskname: '',
        dev_name: '',
        selectedPriority: 'Low',
        startDate: null,
        endDate: null
    });

    const [errors, setErrors] = useState({
        taskname: false,
        dev_name: false,
        startDate: false,
        endDate: false,
        dateRange: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addTask = () => {
        const { taskname, dev_name, startDate, endDate } = formdata;
        const newErrors = {
            taskname: !taskname,
            dev_name: !dev_name,
            startDate: !startDate,
            endDate: !endDate,
            dateRange: startDate && endDate && startDate.isAfter(endDate),
        };

        setErrors(newErrors);

        if (!newErrors.taskname && !newErrors.dev_name && !newErrors.startDate && !newErrors.endDate && !newErrors.dateRange) {
            const newTask = {
                ...formdata,
                id: Date.now(),
            };

            setTasks((prevTasks) => [...prevTasks, newTask]);
            handleClose();
            setFormdata({
                taskname: '',
                dev_name: '',
                selectedPriority: 'Low',
                startDate: null,
                endDate: null,
            });
        }
    };


    return (
        <div>


            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Assign Task
                    </Typography>
                    <Box sx={{ margin: 3 }}>
                        <TextField
                            label="Enter Task Name"
                            name="taskname"
                            variant="standard"
                            sx={{ marginBottom: 3 }}
                            value={formdata.taskname}
                            onChange={handleChange}
                            error={errors.taskname}
                            helperText={errors.taskname ? "Task name is required." : ""}
                        />
                        <TextField
                            label="Enter Developer Name"
                            name="dev_name"
                            variant="standard"
                            sx={{ marginBottom: 3 }}
                            value={formdata.dev_name}
                            onChange={handleChange}
                            error={errors.dev_name}
                            helperText={errors.dev_name ? "Developer name is required." : ""}
                        />

                        <InputLabel id="priority-select-label">Priority</InputLabel>
                        <Select
                            labelId="priority-select-label"
                            sx={{ display: 'flex', width: '200px', height: '40px', marginBottom: 3 }}
                            name="selectedPriority"
                            value={formdata.selectedPriority}
                            onChange={handleChange}
                        >
                            {priorityOption.map((priority, index) => (
                                <MenuItem key={index} value={priority}>
                                    {priority}
                                </MenuItem>
                            ))}
                        </Select>

                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
                            <Box sx={{ marginRight: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Start Date"
                                        value={formdata.startDate}
                                        onChange={(newValue) => {
                                            const startDate = newValue ? dayjs(newValue) : null;
                                            setFormdata((prev) => ({ ...prev, startDate }));
                                            if (startDate && formdata.endDate && startDate.isAfter(formdata.endDate)) {
                                                setErrors((prev) => ({ ...prev, dateRange: true }));
                                            } else {
                                                setErrors((prev) => ({ ...prev, dateRange: false }));
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={errors.startDate || errors.dateRange}
                                                helperText={errors.startDate ? "Start date is required." : errors.dateRange ? "Start date cannot be after end date." : ""}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="End Date"
                                        value={formdata.endDate}
                                        onChange={(newValue) => {
                                            const endDate = newValue ? dayjs(newValue) : null;
                                            setFormdata((prev) => ({ ...prev, endDate }));
                                            if (endDate && formdata.startDate && endDate.isBefore(formdata.startDate)) {
                                                setErrors((prev) => ({ ...prev, dateRange: true }));
                                            } else {
                                                setErrors((prev) => ({ ...prev, dateRange: false }));
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={errors.endDate || errors.dateRange}
                                                helperText={errors.endDate ? "End date is required." : errors.dateRange ? "End date cannot be before start date." : ""}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                    </Box>

                    <Button variant="contained" color='secondary' onClick={addTask} sx={{ mt: 2, mr: 5, ml: 4 }}>
                        Add
                    </Button>
                    <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>



        </div>
    );
};

export default Form;
