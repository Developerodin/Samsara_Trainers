import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
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
import { Overview } from '../../modules/profile/components/Overview';
import { ProfileHeader } from '../../modules/profile/ProfileHeader';
import { ProfileDetails } from '../../modules/accounts/components/settings/cards/ProfileDetails';
const column = [
  { name: "ID" },
  { name: "Name" },
  {name: "Comapny"},
  {name: "Status"},
  { name: "Created At" },
  { name: "Action" },
  { name: "Delete" },
];

export const MyProfileMain = () => {

  const navigate = useNavigate();
  const handelViewClick=()=>{
    navigate("/trainer_view");
  }

  const handelAddNew=()=>{
    navigate("/add_trainer");
  }

  const rows = [
    { Id: "1", Name: "Samar Sharma", Category: "The ODIN", Price:<Button color='success' variant="contained" >Active</Button>, CreatedAt: "04 / Oct / 2023", Action: <RemoveRedEyeIcon onClick={handelViewClick} style={{ color: `${ThemColor.icon}` }} />, Delete: <DeleteIcon color="error" /> },
  ];
  
  return (
   <Box >
    <ProfileHeader/>
    <ProfileDetails/>
        <Overview/>
   </Box>
  )
}

