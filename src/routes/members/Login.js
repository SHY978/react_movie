import axios from 'axios';
import {useState} from 'react';

function postLogin(props){
    axios({      
        method:'POST', 
        url: 'http://localhost:8080/member/2',                 
        data: {
           id : props.id,
           passwd : props.passwd           
        },
    }).then((data)=>{console.log(data)})
}

function Login(){
    let [id, setId] = useState('');
    let [passwd, setPasswd] = useState('');

    return(      
        <div className="login_form">
            <p>아이디</p>
            <input type="text" placeholder="아이디를 입력 해 주세요" onChange={(e)=>{setId(e.target.value)}}/><br/>
            <p>비밀번호</p>
            <input type="password" placeholder="비밀번호를 입력 해 주세요" onChange={(e)=>{setPasswd(e.target.value)}}/>
            <br/>
            <button onClick={()=>{postLogin({id,passwd})}}>로그인</button>            
        </div>         
    );
}
export default Login