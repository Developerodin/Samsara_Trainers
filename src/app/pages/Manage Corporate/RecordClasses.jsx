
import { Box, Button, Card, CardContent, CardHeader, Typography,InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ThemColor } from '../../Them/ThemColor'
import TuneIcon from '@mui/icons-material/Tune';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { GenralTabel } from '../../TabelComponents/GenralTable';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import { AddCircle } from '@mui/icons-material';
import { FeedsWidget6, ListsWidget2 } from '../../../_metronic/partials/widgets';
import SearchIcon from '@mui/icons-material/Search';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { toAbsoluteUrl } from '../../../_metronic/helpers';
const column = [
  { name: "ID" },
  { name: "Name" },
  {name: "Comapny"},
  {name: "Status"},
  { name: "Created At" },
  { name: "Action" },
  { name: "Delete" },
];

export const RecordClasses = () => {

  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [update,setupdate] = useState(0)

  const getAllClasses = async () => {
    try {
      const response = await axios.get(`${Base_url}api/recorded-classes`); // Update the API endpoint accordingly
      
      const Data = response.data;
      console.log("REdorder classes",Data)
      if(Data){
        const ActiveData = Data.filter((el)=>{
          return el.status === true;
        })
        setClasses(ActiveData);
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };



  useEffect(() => {
    // Fetch all classes when the component mounts
    getAllClasses();
  }, [update]);
  
  return (
   <Box >

      
       
          <Box style={{display:"flex",justifyContent:"right",alignItems:"center"}}>
           

          <Box>
        <Box sx={{display:"flex", width:"100%"}}>
            {/* <TextField fullWidth label="Search" /> */}
            
            <TextField
          label="Search"
          id="outlined-start-adornment"
          size='small'
          sx={{ m: 1, width: '100%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
          }}
          // value={searchInput}
          //     onChange={(e) => setSearchInput(e.target.value)}
        />
            </Box>
        </Box>

            <Box style={{marginLeft:"20px"}} >
        
             
              <Button variant='contained' style={{backgroundColor:`${ThemColor.buttons}`}}>
                <TuneIcon />
              </Button>
            </Box>
           
          </Box>
       
   

       <Box style={{marginTop:"20px"}}>
       
       <div className='row g-5 g-xxl-8'>
        {
          classes.length > 0 ? classes.map((el,index)=>{
            return <div className='col-xl-6' key={index}>
            <FeedsWidget6 className='mb-5 mb-xxl-8' Data={el} />
          </div>
          })
          :
          <div style={{textAlign:"center",height:"300px"}} className='col-xl-12'>
             <img src={toAbsoluteUrl('/media/illustrations/dozzy-1/5-dark.png')} style={{height:"90%"}}  alt='' />
            <h2>No Recording Found</h2>
            </div>
        }
      
      
      </div>
        
       </Box>
   </Box>
  )
}

