/* eslint-disable react/jsx-no-target-blank */
import{useContext} from 'react'
import {useIntl} from 'react-intl'

import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import UserContext from '../../../../../Context/UserContext'

const SidebarMenuMain = () => {
  // const {userPermisson}=useContext(UserContext);
  const userPermisson=JSON.parse(sessionStorage.getItem('userPermisson'))
  const intl = useIntl();


  return (

    // <>
    // {userPermisson ? 
      <>
        
      {/* dashboard */}
      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen025.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
  
  
 


  
  
   
  
  
  
 
             
        
        <SidebarMenuItem
            to='/classes/'
            icon='/media/icons/duotune/communication/com013.svg'
            title='Classes'
            fontIcon='bi-layers'
           
          />

<SidebarMenuItem
            to='/recorded_classes/'
            icon='/media/icons/duotune/communication/com013.svg'
            title='Recorded Classes'
            fontIcon='bi-layers'
           
          />
 {/* <SidebarMenuItem
            to='/clients/'
            icon='/media/icons/duotune/communication/com013.svg'
            title='UserList'
            fontIcon='bi-layers'
           
          /> */}
  
  
               <SidebarMenuItem
            to='/trainers-profile/'
            icon='/media/icons/duotune/general/gen019.svg'
            
            title='Trainers profile'
            fontIcon='bi-layers'
           
          />
<SidebarMenuItem
            to='/custom_sessions/'
            icon='/media/icons/duotune/communication/com013.svg'
            title='Custom Session'
            fontIcon='bi-layers'
           
          />
  
  
  
  
  
  {/* Chats  */}
  
  {/* <div className='menu-item'>
          <div className='menu-content'>
            <span className='menu-heading fw-bold  fs-7'>Manage Trainers</span>
          </div>
        </div> */}
  
        {/* {
            userPermisson.PrivateChat && (
              <SidebarMenuItem
              to='/chats/private-chat/'
              icon='/media/icons/duotune/general/gen002.svg'
              title='Private Chat'
              fontIcon='bi-layers'
            />
          
            )
          } */}
  

              <SidebarMenuItem
            to='/my-profile/'
            icon='/media/icons/duotune/communication/com013.svg'
            title='My profile'
            fontIcon='bi-layers'
           
          />
          
          
  
  
        {/* <div className='menu-item mt-5'>
          <div className='menu-content'>
            <span className='menu-heading fw-bold  fs-7'>Billing & Payments</span>
          </div>
        </div> */}
  
        {/* {
            userPermisson.BillingOverview && (
              <SidebarMenuItem
              to='/billing/overview/'
              icon='/media/icons/duotune/abstract/abs014.svg'
              title='Overview'
              fontIcon='bi-layers'
            />
          
            )
          } */}
  
  {/* {
            userPermisson.AllTransactions && (
              <SidebarMenuItem
              to='/billing/alltransaction/'
              icon='/media/icons/duotune/layouts/lay008.svg'
              title='All Transactions'
              fontIcon='bi-layers'
            />
          
            )
          } */}

  
  
  {/* {
            userPermisson.DiscountCoupons && (
              <SidebarMenuItem
              to='/billing/discountCoupons/'
              icon='/media/icons/duotune/abstract/abs014.svg'
              title='Discount Coupons'
              fontIcon='bi-layers'
            />
          
            )
          } */}
  
  
  
  
  
  
       
  
  {/* <div className='menu-item mt-5'>
          <div className='menu-content'>
            <span className='menu-heading fw-bold  fs-7'>Settings</span>
          </div>
        </div>
  
        {
            userPermisson.AdminManagment && (
              <SidebarMenuItem
              to='/settings/adminmanagment/'
              icon='/media/icons/duotune/general/gen002.svg'
              title='Admin Managment'
              fontIcon='bi-layers'
            />
          
            )
          } */}
      
  
      {/* {
            userPermisson.AccessManagment && (
              <SidebarMenuItem
      to='/settings/accessmanagment/'
      icon='/media/icons/duotune/abstract/abs027.svg'
      title='Access Management'
      fontIcon='bi-layers'
    />
          
            )
          } */}
  
  
  {/* {
            userPermisson.SystemMasters && (
              <SidebarMenuItem
              to='/settings/system-masters/'
              icon='/media/icons/duotune/coding/cod003.svg'
              title='System Masters'
              fontIcon='bi-layers'
            />
          
            )
          } */}
  
  
  
  
  
  {/* <SidebarMenuItem
              to='information/'
              icon='/media/icons/duotune/abstract/abs026.svg'
              title='Class Information '
              fontIcon='bi-layers'
             
            /> */}
  
  
  
  
  
  
  
  
  
    
  
    </>
  //   :
  //   <div>No Permisson Allowed</div>
  // }
  //   </>
  
  )
}

export {SidebarMenuMain}
