import React, { useEffect, useState } from 'react'
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import { Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Base_url } from '../../Config/BaseUrl';
const KJUR = require('jsrsasign')


export const ZoomMeeetingRoom2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ZoomMeetingNumber } = location.state; 

    const client = ZoomMtgEmbedded.createClient();
    var authEndpoint = Base_url
var sdkKey = 'TsFvuPFLTeKf7_bNBWggPA'
var meetingNumber =ZoomMeetingNumber.number
var passWord = ZoomMeetingNumber.pass
var role = 1
var userName = 'Akshay'
var userEmail = 'developer@theodin.in'
var registrantToken = ''
var zakToken = ZoomMeetingNumber.userToken
var leaveUrl = 'http://localhost:3000'
var userId="developer@theodin.in"
var SECRET="C7Dm4JuZ2QXoN0bM2OYTw5JxZvjPK1y9"
  
  function getSignature() {
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

    const data = {
      meetingId:meetingNumber,
      meetingPassword:passWord
    }
    setTimeout(()=>{
      startMeeting(sdkJWT,data)
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
      
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleJoinMeeting = async () => {
           getSignature()
  };

  const handelBack=()=>{
    window.history.back();
  }
  useEffect(()=>{
    console.log("Data===>",ZoomMeetingNumber);
    handleJoinMeeting();
  },[])
  return (
    <div>

<div style={{marginBottom:"30px"}}>
<KeyboardBackspaceIcon onClick={handelBack}/>
</div>

<div id="meetingSDKElement" >
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

{
  !ZoomMeetingNumber && 
  <Box style={{textAlign:"center",border:"1px solid red"}}>
    <h2 style={{fontSize:"30px"}}>Meeting credentials not matched !!</h2>
    <h2 style={{fontSize:"16px"}}>Go back refresh and try again</h2>
    <Button sx={{marginTop:"30px"}} variant='contained'  onClick={handelBack} >Go Back</Button>
  </Box>
}
    </div>

    
  )
}

