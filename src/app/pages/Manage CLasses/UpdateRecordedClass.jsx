import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, TextField, Typography,Select,MenuItem,FormControl,
  InputLabel } from '@mui/material';
import { ThemColor } from '../../Them/ThemColor';
import Grid from "@mui/material/Grid";
import { Base_url } from '../../Config/BaseUrl';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
export const UpdateRecordedClass = () => {
  const {id} = useParams()
  const [newClass, setNewClass] = useState({
    title: '',
    description: '',
    teacher: '',
    classRecordingLink:"",
    
  });


  const [TeachersData,setTeachersData] = useState([])

  const handleDateChange = (date) => {
    setNewClass((prevClass) => ({ ...prevClass, schedule: date }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prevClass) => ({
      ...prevClass,
      [name]: value,
    }));
  };

  const UpdateRecordedClass = async () => {
    try {
      const response = await axios.put(`${Base_url}api/recorded-classes/${id}`, newClass);
      // setClasses((prevClasses) => [...prevClasses, response.data.data]);
      setNewClass({
        title: '',
        description: '',
        teacher: '',
        classRecordingLink:"",
        
      });
      handelGoBack()
    } catch (error) {
      console.error('Error creating class:', error.message);
    }
  };

  const handelGoBack=()=>{
    window.history.back()
  }

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${Base_url}api/teacher`); // Replace with your actual API endpoint
      // setUsers(response.data.data.users);
      const Data= response.data.data.teachers
      console.log("Trainer Data ==>",Data)
      if(Data){
        setTeachersData(Data)
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };
  const fetchRecordedClassById = async (id) => {
    try {
      const response = await axios.get(`${Base_url}api/recorded-classes/${id}`); // Replace with your actual API endpoint
      // setUsers(response.data.data.users);
      const Data= response.data
      console.log("User Data edit ==>",Data)
      if(Data){
        const formattedDate = dayjs(Data.schedule);
        console.log("Formated Data ===>", formattedDate)
        setNewClass( {
          title: Data.title,
          description: Data.description,
          teacher: Data.teacher,
          classRecordingLink:Data.classRecordingLink,
          
        })
      

         

    // Update the state with the formatted date
   
    
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };
  useEffect(()=>{
    fetchTeachers();
    fetchRecordedClassById(id)
  },[])


  return (
    <div style={{ display: "flex", backgroundColor: "#fff" }}>
      
      <div
        style={{
          flex: 1,
          padding: "20px",
          // backgroundColor: "#FFFBF5",
          margin: "0px",
          borderRadius:"10px",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      >
         <div>
         <Box style={{display:"flex",alignItems:"center"}}>
              <ArrowBackIcon onClick={handelGoBack}  style={{marginRight:"20px",color:`${ThemColor.buttons}`}}/>
            <Typography variant='h5' style={{letterSpacing:1,fontSize:14,fontWeight:"bold",color:"grey"}}>Update class</Typography>
            </Box>

<Box sx={{marginTop:"30px"}}>
<Grid container spacing={3}>
              <Grid item xs={6}>
              <TextField
                      id="outlined-basic"
                      label="Class Title"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="title" 
                      value={newClass.title} 
                      onChange={handleInputChange}
                    />
                  </Grid>

                 


                  <Grid item xs={6}>
              <TextField
                      id="outlined-basic"
                      label="Class Description"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="description"
          value={newClass.description}
          onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
              <TextField
                      id="outlined-basic"
                      label="Recording Link"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="classRecordingLink"
                      value={newClass.classRecordingLink} 
                      onChange={handleInputChange}
                    />
                  </Grid>

                

                  <Grid item xs={6}>
                  <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Select Teacher
                      </InputLabel>
                      <Select
              label="Teacher"
              variant="outlined"
              style={{ width: '100%' }}
              name="teacher"
              value={newClass.teacher}
              onChange={handleInputChange}
            >
              {TeachersData.map((teacher) => (
                <MenuItem key={teacher._id} value={teacher._id}>
                  {teacher.name} {/* Assuming your teacher object has a 'name' property */}
                </MenuItem>
              ))}
            </Select>
                    </FormControl>
           
          </Grid>


                  

               
                <Grid item xs={12}>
                  <div
                    style={{
                      marginTop: "30px",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    

                    <Button
                      variant="contained"
                      size="large"
                      style={{ backgroundColor: "#EE731B" }}
                      onClick={UpdateRecordedClass}
                    >
                      Update
                    </Button>
                  </div>
                </Grid>
              </Grid>
</Box>
            

      
    </div>
      </div>

    </div>
  
  )
}
