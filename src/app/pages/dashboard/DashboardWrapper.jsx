/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'

import {useIntl} from 'react-intl'
// import PieChart from 'react-pie-graph-chart';
import {KTCard, toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  MixedWidget2,
  ChartsWidget3,
  ChartsWidget6,
  EngageWidget10
} from '../../../_metronic/partials/widgets'
import { ChartsWidget170 } from './ChartsWidget170'
import { AllChargersMap } from './AllChargersMap'
import { PieWidgetDashboard } from './PieWidgetDashboard'
import { BASE_URL } from '../../Config/BaseUrl'
import axios from 'axios'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./MiniCalendar.css";
import { GenralTabel } from '../../TabelComponents/GenralTable'
import { Button } from '@mui/material'

const column=[
  {name:"Issues"},
  {name:"Progress"},
  {name:"Total Sessions"},
  {name:"Taken Session"},
  {name:"Status"}
]

const rows=[
  {name:"Depression",progress:"20%",Tsessions:"120",takenSessions:"23",Status:<Button color='error' variant="contained" >Need Attention</Button>},
  {name:"Sciatica",progress:"90%",Tsessions:"120",takenSessions:"115",Status:<Button color='primary' variant="contained" >In Progress</Button>},
  {name:"Insomnia",progress:"100%",Tsessions:"150",takenSessions:"148",Status:<Button color='success' variant="contained" >Completed</Button>},
  {name:"Backproblem",progress:"80%",Tsessions:"120",takenSessions:"23",Status:<Button color='warning' variant="contained" >Keep Going</Button>},

]
const DashboardPage = ({users}) => (
  
  <>

    {/* begin::Row */}
   	

    <div className='row g-5 g-xl-10' style={{marginTop:"10px"}}>
      <div className='col-md-12 col-lg-12 col-xl-12 col-xxl-3 ' >
        {/* mb-md-5 mb-xl-10 */}
      <CardsWidget20
          className=' mb-5'
          description='Total Lectures'
          color='#1B9A8B'
          img={'https://theodin.in/demos2/ic_dashboard/dist/assets/media/patterns/vector-12.png'}
          percent="42"
          heading="132"
          pending="Completed"
        />
       
         <CardsWidget7
          className=' '
          description='Total Hours'
          color='#1B9A8B'
          icon={false}
          stats={"150"}
          labelColor='dark'
          textColor='gray-300'
          />


      
      </div>

     
      <div className='col-md-12 col-lg-12 col-xl-12 col-xxl-3 ' >
        <div className="row">
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-12 mb-md-5  '>
        
        <CardsWidget17 className=' '/>
        </div>

        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-12 mb-md-5  ' >
         <ChartsWidget170 className=' '/>
        
        </div>
        </div>    
      </div>

      <div className='col-xxl-6'>
        <EngageWidget10 className='h-md-100' />
      </div>
    </div>
    {/* end::Row */}
    <div className='row gy-5 g-xl-8' style={{marginTop:"20px"}}>
	  <div className='col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
    <KTCard>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"450px"}}>
          <Calendar />
          </div>
       
        </KTCard>
	   </div>	
	</div>
   


   

    {/* begin::Row */}
    <div className='row gy-5 gx-xl-8' style={{marginTop:"20px"}}>
      <div className='col-md-6'>
        <ChartsWidget3 className='card-xl-stretch mb-xl-8'/>
      </div>
      <div className='col-md-6'>
        <PieWidgetDashboard className='card-xl-stretch mb-xl-8'/>
      </div>
    </div>

    {/* <div className='row gy-5 gx-xl-8' style={{marginTop:"20px"}}>
      <div className='col-md-12'>
     
       <KTCard>
        <div style={{padding:"10px",textAlign:"center",marginBottom:"30px"}}>
        <p style={{fontSize:"24px",fontWeight:"bold",color:"#7C93C3"}}>
        Health Issues Progress
        </p>
        </div>
        
       
       </KTCard>
       <GenralTabel column={column} rows={rows} />
      </div>
    </div> */}

	
   
	 

   
  
  
    
  </>
)

const DashboardWrapper = () => {
  const intl = useIntl()
  const token =sessionStorage.getItem('token');
  const [usersrows, setUsersRows] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/customers/customers
        `, {
          headers: { Authorization: `${token}` },
        });
        // Assuming the response data is an array of objects with the required properties
        
        const data = response.data;
        const CustomersData=data.data.users;
        console.log("response chargers==>", CustomersData);
        if(data && data.status === 'success'){
          
  
          setUsersRows(CustomersData);
        }
        else{
          setUsersRows([]);
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsersRows([]);
      }
    };
  
    // console.log("UserData", userData);
    fetchData();
  },[])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage  users={usersrows}/>
    </>
  )
}

export {DashboardWrapper}
