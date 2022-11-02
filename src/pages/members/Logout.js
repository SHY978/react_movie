import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeUid } from '../../store.js'
import {useNavigate} from 'react-router-dom';

function Logout(){
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let selector = useSelector((state)=>{return state.user});
    axios({      
        method:'post', 
        url: 'http://localhost:8080/member/4',     
        withCredentials : true,//node와 쿠키(세션) 공유                
    }).then(()=>{           
        dispatch(changeUid('empty'))
        console.log(selector.uid)
        navigate('/')
        })
    }    
export default Logout