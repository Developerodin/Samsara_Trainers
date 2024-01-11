/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import { Grid } from '@mui/material'
import "./Login.css"
const AuthLayout = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      {/* begin::Body */}
      <div  className={`d-flex flex-column flex-lg-row-fluid w-lg-50 p-10  order-2 order-lg-1 h-100`} id="login_Conatiner">
        {/* begin::Form */}
        <div className='d-flex  flex-column flex-lg-row-fluid h-100'  >
          {/* begin::Wrapper */}
          <div className='w-lg-100 h-100 ' >
            <Outlet />
          
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}

        {/* begin::Footer */}
        
        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div
        className='d-flex flex-lg-row-fluid w-lg-100 bgi-size-cover bgi-position-center order-1 order-lg-2'
        id="container1"
      >
        {/* begin::Content */}
      

        <div 
         
        style={{
          flex: 2,
         
          padding: "10px",
        
         display: "flex",
         justifyContent:"center",
         alignItems:"center"
          
        }}
      >
        <div>

        <div >
          <Grid container spacing={2}>
          <Grid item xs={6}>
              <div
                style={{
                  
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "250px"
                
                }}
              >
                <p
                  style={{
                    fontSize: "34px",
                    letterSpacing: 3,
                    fontWeight: 500,
                  }}
                >
                  Yoga at Home with Expert Teachers - Live!
                </p>
              </div>
            </Grid>
          <Grid item xs={6}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center" }}>
                <img
                  style={{ height: "250px" }}
                  src="https://verv.com/wp-content/uploads/2018/12/seiza_pose-e1545294218881.jpg"
                  alt="img"
                />
              </div>
            </Grid>
            
            
          </Grid>
        </div>

        <div style={{ marginTop: "40px" }}>
          <Grid container spacing={2}>
          <Grid item xs={6}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center"  }}>
                <img
                  style={{ height: "250px" }}
                  src="https://staticg.sportskeeda.com/editor/2022/11/2ca83-16687038360374-1920.jpg"
                  alt="img"
                />
              </div>
            </Grid>

          <Grid item xs={6}>
              <div
                style={{
                
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height:"250px"
                }}
              >
                <p
                  style={{
                    fontSize: "34px",
                    letterSpacing: 3,
                    fontWeight: 500,
                  }}
                >
                  Elevate Your Practice with Yoga's Best
                </p>
              </div>
            </Grid>
            
            
          </Grid>
        </div>


        <div style={{ marginTop: "40px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div
                style={{
                 
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height:"250px"
                }}
              >
                <p
                  style={{
                    fontSize: "34px",
                    letterSpacing: 3,
                    fontWeight: 500,
                  }}
                >
                  The Easy Start <br /> & Stick With It Plan
                </p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center" }}>
                <img
                  style={{ height: "250px" }}
                  src="https://clipground.com/images/yoga-png-image-2.png"
                  alt="img"
                />
              </div>
            </Grid>
          </Grid>
        </div>
        {/* Add more content as needed */}
        </div>
      </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
    </div>
  )
}

export {AuthLayout}
