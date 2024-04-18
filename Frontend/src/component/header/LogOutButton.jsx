import {React, useState} from 'react'
import {  useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import {useNavigate, useParams} from 'react-router-dom'
import Button from '../Tags/Button'
import axios from 'axios';
import Cookies from 'js-cookie';


function LogOutButton() {
  const navigate = useNavigate()
    const dispatch = useDispatch();
    const [ user, setUser ] = useState()
    
    const onhandler = () =>{     
         setUser(Cookies.get('userData'))
         dispatch(logout())         
         Cookies.remove('userData');
         console.log(user);
         navigate('/login')
    }
  return (
     <Button onClick={onhandler} variant='danger'>Logout</Button>
  )
}

export default LogOutButton