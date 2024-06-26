import { Autocomplete, Box, Button, Card, CardContent, TextField,InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ThemColor } from '../../Them/ThemColor'
import TuneIcon from '@mui/icons-material/Tune';
import { AddCircle } from '@mui/icons-material';
import { GenralTabel } from '../../TabelComponents/GenralTable';
import { useNavigate } from 'react-router-dom';
import { Base_url } from '../../Config/BaseUrl';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
const KJUR = require('jsrsasign')
const column=[
  {name:"Trainer"},
  {name:"User"},
  {name:"Schedule Date"},
  {name:"Schedule Time"},
  {name:"Message"},
  {name:"Status"},
  // {name:"Delete"},
  {name:"Action"},
  {name:"Meeting"},

  
]
export const CustomSessions = () => {
  const navigate = useNavigate();
  const user=JSON.parse(sessionStorage.getItem('User'));
    const [rows, setRows] = useState([]);
    const [CustomSessions, setCustomSessions] = useState([]);
    const [filterRows,setFilterRows] = useState([])
    const [update,setupdate] = useState(0)
    const [zoomToken, setZoomToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = React.useState('');
  const [OauthuserToken, setOauthUserToken] = useState(null);
  const [meetingNumberMain, setMeetingNumber] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [meetingPassowrdMain, setMeetingPassword] = useState(null);
  const handleOuthAccessToken = async () => {
    // Extract the authorization code from the URL query parameters
    // const urlParams = new URLSearchParams(window.location.search);
    // const code = urlParams.get('code');
    //  console.log("Code ===> " + code)
    // if (code) {
      try {
        // Make a request to your backend to exchange the authorization code for an access token
        const tokenResponse = await axios.get(`${Base_url}api/zoom/zoom/oauth-token`);
        if (tokenResponse.data.access_token) {
          const token = tokenResponse.data.access_token
            setOauthUserToken(tokenResponse.data.access_token);
            
              fetchZoomTokenServerOauth(tokenResponse.data.access_token);
             return token
           
        } else {
          console.error('Failed to fetch Zoom token:', tokenResponse.data.error);
        }
      } catch (error) {
        console.error('Error exchanging code for token:', error);
      }
    // } else {
    //   console.error('Authorization code not found in URL parameters.');
    // }
  };

  const fetchZoomTokenServerOauth = async (token) => {
    try {
      // Replace 'YOUR_NODE_API_URL' with the actual URL where your Node.js API is running
      const apiUrl = `${Base_url}api/zoom/fetchZoomToken`;
        console.log('Token',OauthuserToken)
      // Make the API request
      const response = await axios.post(apiUrl, {
        AccessTokenMain: token,
      });
        
      // Parse and set the Zoom token
      setUserToken(response.data.token);
    } catch (error) {
      // Handle errors
      console.error('Error fetching Zoom token:', error);
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  };

  const createZoomMeeting = async (OauthToken,Data) => {
    try {
        
        const data = {
            token: OauthToken,
            data: Data
          };
      const response = await fetch(`${Base_url}api/zoom/createZoomMeeting-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const data = await response.json();
        setMeetingNumber(data.meetingNumber);
        setMeetingPassword(data.password);
        // handleCreateMeeting(data.meetingNumber,data.password)
        const MeetingData ={
         number:data.meetingNumber,
         pass:data.password
        }
        setupdate((prev)=>prev+1)
        // setZoomMeetingNumber(MeetingData);
        console.log('Meeting Number:', data.meetingNumber);
      } else {
        console.error('Failed to create meeting:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating meeting:', error.message);
    }
  };

  const handelMeetingStart=async(Data,id)=>{
    console.log("Meeting start =>",id)
    handleOuthAccessToken().then((res)=>{
      console.log("Token in fun ==>",res)
      setZoomToken(res)
      createZoomMeeting(res,Data,id);
    })
  }

  const handelZoomMeeting = (Data)=>{
  
    const data =Data
    console.log("Data===>",data)
    const ZoomMeetingNumber={
    number:data.meeting_number,
    pass:data.password,
    userToken:userToken
    }
    navigate(`zoom-cdn/`, { state: { ZoomMeetingNumber } });
  }

  const handelZoomMeetingEnd=async(id)=>{
    console.log("delete Meeting",OauthuserToken,"Id===============>",meetingNumberMain)
    const data = {
      token: OauthuserToken,
      meetingId:meetingNumberMain
    };
    try {
      const res = await axios.post(`${Base_url}api/custom_session/end_meeting/${id}`,data, {
        // headers: { "Authorization": `${token}` }
      });
      console.log("res Customer delete === ==>", res);
      if(res){ 
        alert("Meeting Ended successfully")
        setupdate((prev)=>prev+1)
      }
    
    } catch (err) {
      console.log("error in Customer delete", err);
    }
  }

  const handelDeleteSessions=async(id)=>{
    console.log("delete Customer",id)
   
    try {
      const res = await axios.delete(`${Base_url}api/custom_session/${id}`, {
        // headers: { "Authorization": `${token}` }
      });
      console.log("res Customer delete === ==>", res);
      setupdate((prev)=>prev+1)
    } catch (err) {
      console.log("error in Customer delete", err);
    }
  }
  const handleApprove = async (sessionId,value) => {
      try {
        const response = await axios.put(`${Base_url}api/custom_session/approve/${sessionId}`,{value});
  
        // Assuming your backend returns the updated session data
        const updatedSession = response.data;
        setupdate((prev)=>prev+1)
        // Handle the updated session data as needed
        console.log('Updated Session:', updatedSession);
  
        // Optionally, you can trigger a UI update or perform other actions here
      } catch (error) {
        console.error('Error:', error.message);
        // Handle error, show a message to the user, etc.
      }
    };

    const getAllCustomSessions = async () => {
      try {
        const response = await axios.get(`${Base_url}api/custom_session`); // Update the API endpoint accordingly
        setCustomSessions(response.data);
        const Data = response.data
        console.log("Data Class DAta in if  : ",response)
        if(Data){
          const SessionData = Data.filter((el)=>{
            return el.teacher._id === user._id
          })
            const formattedData = SessionData.map((item) => ({

           "Teacher":item.teacher ? item.teacher.name : "no teacher assigned",
           "User":item.user ? item.user.name : "no user assigned",
           "Date":item.date,
           "Time":item.timeSlot ? item.timeSlot.timeRange : "no timeSlot assigned" ,
           "message":item.message,
          "Status": <Button  variant="text" >{item.sessionValue}</Button>,
        //  "Delete": <DeleteIcon  onClick={() => handelDeleteSessions(item._id)}/>,
          "Action":item.sessionValue === "approved"  ? <Button color='error' variant="contained" onClick={()=>handleApprove(item._id,"pending")} >Un approve</Button> : 
          <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          {
            item.sessionValue !== "completed" && <Button color='success' variant="contained" onClick={()=>handleApprove(item._id,"approved")} >Approve</Button>
          }
          
          <Button color='success' sx={{marginLeft:"10px"}} variant="contained" onClick={()=>handleApprove(item._id,"completed")} >Mark Complete</Button>
          </Box>,
          
          "Meeting":<Box style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          
          <Button variant='contained' onClick={()=>handelMeetingStart(item,item._id)}>Start</Button>

          {
            item.meeting_number && <Button variant='contained' style={{marginLeft:"20px"}} onClick={()=>{handelZoomMeeting(item)}}>Join</Button>
            
          }
          {
            item.meeting_number && <Button variant='contained' style={{marginLeft:"20px"}} onClick={()=>{handelZoomMeetingEnd(item._id)}}>End</Button>
            
          }
          
      </Box>
       }));

  
        // console.log("Formated DAta ==>",formattedData)
  
       setRows(formattedData);
       setFilterRows(formattedData);
     
      
      
        }
      } catch (error) {
        console.error('Error fetching classes:', error.message);
      }
    };


    const handleSearch = () => {
      const filteredData = rows.filter((row) =>
        Object.values(row)
          .filter((value) => typeof value === 'string') // Filter only string values
          .some((value) =>
            value.toLowerCase().includes(searchInput.toLowerCase())
          )
      );
      setFilterRows(filteredData);
    };
    const handleResetFilter = () => {
      setSearchInput('');
      setFilterRows(rows);
    };
       

  

    useEffect(() => {
      // Fetch all classes when the component mounts
      getAllCustomSessions();
    }, [update]);
  return (
    <div>
      <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>
        <Card>
        <CardContent>
          {/* <Box>
            <p>current active metting:{meetingNumberMain}</p>
          </Box> */}
          <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
           

          <Box sx={{marginTop:"30px",display:"flex",alignItems:"center"}}>
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
          value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
        />
            </Box>
        </Box>
  
        <Button  sx={{marginLeft:"20px"}} variant="contained" onClick={handleSearch}> Search</Button>
        <Button sx={{marginLeft:"20px"}} variant="outlined" onClick={handleResetFilter}> <FilterAltIcon sx={{marginRight:"10px"}} />Reset Filter</Button>
      </Box>

            <Box >
        
             
              <Button variant='contained' style={{backgroundColor:`${ThemColor.buttons}`}}>
                <TuneIcon />
              </Button>
            </Box>
           
          </Box>
        </CardContent>
       </Card>


       <Box style={{marginTop:"-2px"}}>
       
          <GenralTabel column={column} rows={filterRows} />
        
       </Box>
    </div>
  )
}
