import React, { useEffect, useState } from 'react';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import { Button } from '@mui/material';
const KJUR = require('jsrsasign')


function HostMeeting({setZoomMeetingNumber}) {
  const [zoomToken, setZoomToken] = useState(null);
  const [loading, setLoading] = useState(true);
const[ShowVideo,setShowVideo] = useState(false)
const [userToken, setUserToken] = useState(null);
const [OauthuserToken, setOauthUserToken] = useState(null);
const [meetingNumberMain, setMeetingNumber] = useState(null);
const [meetingPassowrdMain, setMeetingPassword] = useState(null);
  const client = ZoomMtgEmbedded.createClient();
  var authEndpoint = Base_url
var sdkKey = 'TsFvuPFLTeKf7_bNBWggPA'
var meetingNumber =meetingNumberMain
var passWord = meetingPassowrdMain
var role = 1
var userName = 'Akshay'
var userEmail = 'developer@theodin.in'
var registrantToken = ''
var zakToken = userToken
var leaveUrl = 'http://localhost:3000'
var userId="developer@theodin.in"
var SECRET="C7Dm4JuZ2QXoN0bM2OYTw5JxZvjPK1y9"

  function getSignature(e) {
    const iat = Math.round(new Date().getTime() / 1000) - 30
    const exp = iat + 60 * 60 * 2
    const oHeader = { alg: 'HS256', typ: 'JWT' }
  
    const oPayload = {
      sdkKey: sdkKey,
      appKey: sdkKey,
      mn: meetingNumber,
      role: role,
      iat: iat,
      exp: exp,
      tokenExp: exp,
      userId: userId,
    }
  
    const sHeader = JSON.stringify(oHeader)
    const sPayload = JSON.stringify(oPayload)
    const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, SECRET);
    setTimeout(()=>{
      startMeeting(sdkJWT)
    },1000)
    
    return sdkJWT
  }

  function startMeeting(signature) {

    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({zoomAppRoot: meetingSDKElement, language: 'en-US',
    customize: {
      video: {
        isResizable: true,
        viewSizes: {
          default: {
            width: 1300,
            height: 600
          },
          ribbon: {
            width: 700,
            height: 700,
          }
        }
      }
    }
  
  }).then(() => {
      client.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        password: passWord,
        userName: userId,
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken,
        
      }).then((res) => {
        console.log('joined succesfully',res);
        setShowVideo(true);
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  const fetchZoomToken = async () => {
    try {
      // Redirect the user to the Zoom authorization URL
      window.location.href = `${Base_url}api/zoom/getZoomToken`;
    } catch (error) {
      console.error('Error redirecting to Zoom authorization URL:', error);
    }
  };

  const HandelOuth = ()=>{
    fetchZoomToken().then((res)=>{
        console.log("Res form zoom token",res)
    })
  }

  const createZoomMeeting = async () => {
    try {
        
        const data = {
            token: OauthuserToken,
          };
      const response = await fetch(`${Base_url}api/zoom/createZoomMeeting`, {
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
        handleCreateMeeting(data.meetingNumber,data.password)
        const MeetingData ={
         number:data.meetingNumber,
         pass:data.password
        }
        setZoomMeetingNumber(MeetingData);
        console.log('Meeting Number:', data.meetingNumber);
      } else {
        console.error('Failed to create meeting:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating meeting:', error.message);
    }
  };

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
            setOauthUserToken(tokenResponse.data.access_token);
            
              fetchZoomTokenServerOauth(tokenResponse.data.access_token);
           
           
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

 
  const handleCreateMeeting = async (id,pass) => {
    const meetingData = {
      meetingName: 'Example Meeting',
      title: 'Meeting Title',
      duration: 60,
      meetingId: id,
      meetingPassword: pass,
      hostName: 'Admin User',
      teacherName: 'Teacher Name',
    };

    try {
      const response = await axios.post(`${Base_url}api/meeting`, meetingData);

      if (response.status === 201) {
        // Meeting created successfully
        console.log('Meeting created successfully');
      } else {
        // Handle error
        console.error('Failed to create meeting');
      }
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  useEffect(() => {
    const handleZoomCallback = async () => {
        // Extract the authorization code from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
         console.log("Code ===> " + code)
        if (code) {
          try {
            // Make a request to your backend to exchange the authorization code for an access token
            const tokenResponse = await axios.get(`${Base_url}api/zoom/zoom/callback?code=${code}`);
            console.log("I am in if ")
            if (tokenResponse.data.userToken) {
              setUserToken(tokenResponse.data.userToken);
            } else {
              console.error('Failed to fetch Zoom token:', tokenResponse.data.error);
            }
          } catch (error) {
            console.error('Error exchanging code for token:', error);
          }
        } else {
          console.error('Authorization code not found in URL parameters.');
        }
      };
  
      handleZoomCallback();
  }, []);

  return (
    <div className="App">
      <main style={{marginTop:"30px"}}>
        <h1>Admin Control (testing)</h1>

        {/* For Component View */}
       
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>


        <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"30px"}}>
        <Button variant='outlined'  onClick={handleOuthAccessToken}>Access Token</Button>
        
        {userToken &&
        <div>
      
        <Button variant='outlined' style={{marginLeft:"30px"}} onClick={createZoomMeeting}>Create Zoom Meeting</Button>
      
    </div>
}
    
{
    userToken && <Button variant='outlined' style={{marginLeft:"30px"}} onClick={getSignature}>Join Meeting</Button>
}
        </div>

        

        
      
      {/* <button style={{marginLeft:"30px"}} onClick={fetchZoomTokenServerOauth}>Zak Token</button> */}
      
      </main>
           <div style={{marginTop:"30px"}}>
           {meetingNumberMain && <p>Meeting Number: {meetingNumberMain}</p>}
           </div>
      <div>
         {
          OauthuserToken && <p>Access Token : {`${OauthuserToken.slice(0,20)}`}...</p>
         }
    </div>
    <div>
         {
          userToken && <p> Zak Token  : {`${userToken.slice(0,20)}`}...</p>
         }
    </div>
    </div>
  );
}

export default HostMeeting;
