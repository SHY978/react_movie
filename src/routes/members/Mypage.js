import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from './Logout.js'

function Mypage(){
    let navigate = useNavigate();    
    let selector = useSelector((state)=>{return state.user});
    
    axios({      
        method:'post', 
        url: 'http://localhost:8080/session',     
        withCredentials : true,//node와 쿠키(세션) 공유                
    }).then((data)=>{   
        if(!data.data.uid || data.data.uid !== selector.uid){        
            <Logout/>
        }
    })      
    return ( 
        <ListGroup defaultActiveKey="#link1">        
        <ListGroup.Item action onClick={()=>{navigate('/members/3')}} >
          개인정보 수정
        </ListGroup.Item>
        <ListGroup.Item action onClick={()=>{navigate('/members/3')}} >
          예매 내역
        </ListGroup.Item>
        <ListGroup.Item action onClick={()=>{navigate('/board/')}} >
          공지사항
        </ListGroup.Item>                
      </ListGroup>
      )
  
}
export default Mypage