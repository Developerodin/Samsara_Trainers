/* eslint-disable jsx-a11y/anchor-is-valid */
import {useContext, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'
import { useNavigate,Navigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import Cookies from 'js-cookie';
import UserContext from '../../../../Context/UserContext'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const {setUserToken}=useContext(UserContext)
  const [visibleSection, setVisibleSection] = useState(1);
  const [showPass, setPass] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "+91 ",
    otp: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelDashboard =()=>{
    // var AuthValue = localStorage.getItem("authValue");
    const AuthValue = sessionStorage.getItem("authValue");
    const user=JSON.parse(sessionStorage.getItem('User')) || null;
    console.log("storedAuthValue",AuthValue)
    if(user && user.status === true){
      if(AuthValue === 'true'){
        // window.location.reload();
        navigate("/dashboard");
        console.log("hii from navigate")
      }
      else{
        navigate("/auth");
      }
    }
    else{
      // navigate("/error/404");
    }
    
  }

  const handelBack = () => {
    setPass(false);
  };



  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: userData} = await login(values.email, values.password)
        saveAuth(userData)
        console.log("userdata after Login====>",userData);
        // const {data: user} = await getUserByToken(auth.api_token)
        // const user=
        
        if(userData && userData.status === "success"){
          setCurrentUser(userData.data.user);
          // localStorage.setItem("authValue", "true");
          // localStorage.setItem("User",JSON.stringify(userData.data.user));
          sessionStorage.setItem("authValue", "true");
          sessionStorage.setItem('User', JSON.stringify(userData.data.user));
          sessionStorage.setItem('token',userData.token);
          
          // expires in 7 days
          
           setLoading(false)
            window.location.reload();
        }
        else{
            setStatus('The login details are incorrect')
            // localStorage.setItem("authValue", "false");
            sessionStorage.setItem('authValue', 'false');
            setSubmitting(false)
          setLoading(false)
          }
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
 
    },
  })

  return (
   

<div style={{ padding: "20px", backgroundColor: "#FFFBF5",
borderRadius:`${!isMobile ? "50px" : "0px"}`,
boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
width:"100%",
height:"100%",
}}>

 <div
   style={{
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     height: "100%",
  
     width:"100%",
   
   }}
 >
<div style={{width:"100%"}}>

  
<div style={{ textAlign: "center",marginBottom:"20px"}}>
     <img src={toAbsoluteUrl('/media/logos/samsara-logo.png')}   alt="img" />
   </div>

<form
className='form w-100'
onSubmit={formik.handleSubmit}
noValidate
id='kt_login_signin_form'
>

{/* <div className='text-center mb-11'>
<h1 className='text-dark fw-bolder mb-3'>Sign In</h1>

</div> */}

{
formik.status &&  <div className='mb-lg-15 alert alert-danger'>
<div className='alert-text font-weight-bold'>{formik.status}</div>
</div>
}

<div className='fv-row mb-8'>
<label className='form-label fs-6 fw-bolder text-dark'>Email</label>
<input
  placeholder='Email'
  {...formik.getFieldProps('email')}
  className={clsx(
    'form-control bg-transparent',
    {'is-invalid': formik.touched.email && formik.errors.email},
    {
      'is-valid': formik.touched.email && !formik.errors.email,
    }
  )}
  type='email'
  name='email'
  autoComplete='off'
/>
{formik.touched.email && formik.errors.email && (
  <div className='fv-plugins-message-container'>
    <span role='alert'>{formik.errors.email}</span>
  </div>
)}
</div>

<div className='fv-row mb-3'>
<label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
<input
  type='password'
  
  placeholder='Password'
  autoComplete='off'
  {...formik.getFieldProps('password')}
  className={clsx(
    'form-control bg-transparent',
    {
      'is-invalid': formik.touched.password && formik.errors.password,
    },
    {
      'is-valid': formik.touched.password && !formik.errors.password,
    }
  )}
/>
{formik.touched.password && formik.errors.password && (
  <div className='fv-plugins-message-container'>
    <div className='fv-help-block'>
      <span role='alert'>{formik.errors.password}</span>
    </div>
  </div>
)}
</div>

<div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
<div />


<Link to='/auth/forgot-password' style={{color:"orange"}}>
  Forgot Password ?
</Link>

</div>

<div className='d-grid mb-10'>
<button
  type='submit'
  id='kt_sign_in_submit'
  className='btn btn-warning'
  disabled={formik.isSubmitting || !formik.isValid}
  onClick={handelDashboard}
  style={{backgroundColor:"orange"}}
>
  {!loading && <span className='indicator-label'>Continue</span>}
  {loading && (
    <span className='indicator-progress' style={{display: 'block'}}>
      Please wait...
      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
    </span>
  )}
</button>

</div>



</form>

  <div className='d-flex flex-center flex-wrap px-5'>
        {/* begin::Links */}
        <div className='d-flex fw-semibold text-primary fs-base'>
          <a href='#' className='px-5 ' target='_blank' style={{color:"orange"}}>
            Terms
          </a>

          <a href='#' className='px-5' target='_blank' style={{color:"orange"}}>
            Plans
          </a>

          <a href='#' className='px-5' target='_blank' style={{color:"orange"}}>
            Contact Us
          </a>
        </div>
        {/* end::Links */}
      </div>
      </div>
        </div>
</div>
  )
}





