import axios from "axios";
import Button from "react-bootstrap/Button";
import {useState} from 'react';

function openSms(){
  axios.post('http://localhost:8080/sms').then(()=>{console.log('됐냐?')})
  .catch(()=>{console.log('실패?')})
}
function postData(props){
  if(props.passwd === props.passwdCk){
    axios({
      method : 'post',
      url: 'http://localhost:8080/member/1',                  
      data: {
         id : props.id,
         passwd : props.passwd,
         name : props.name,
         phone : props.phone
      },
  }).then(()=>{console.log('성공?')}).catch(()=>{console.log('실패?')})
  }else{
    alert('비밀번호가 틀립니다.');
  }
  console.log(props.id)
  
}

function Join() {
  const [id , setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const [passwdCk, setPasswdCk] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  return (  
    <form className="joinForm">
        <p>아이디</p>
        <input type="text" placeholder="아이디를 입력하여 주세요." onChange={(e)=>{setId(e.target.value)}}/>

        <p>비밀번호</p>
        <input type="password" placeholder="비밀번호를 입력하여 주세요." onChange={(e)=>{setPasswd(e.target.value)}} />

        <p>비밀번호 재확인</p>
        <input type="password" placeholder="비밀번호를 입력하여 주세요."onChange={(e)=>{setPasswdCk(e.target.value)}}/>
        
        <p>이름</p>
        <input type="text" placeholder="이름을 입력하여 주세요."onChange={(e)=>{setName(e.target.value)}}/>

        {/* <p>주소</p>
        <input type="text" placeholder="아이디를 입력하여 주세요."/> */}

        <p>전화번호</p>
        <input type="number" placeholder="특수문자를 제외한 번호를 입력해 주세요."onChange={(e)=>{setPhone(e.target.value)}}/> &nbsp;
        
        <Button variant="primary" className="bt" type="button" onClick={()=>{openSms()}}>
            인증
        </Button>
        <br/>
        <br/>
        <input type="text" placeholder="인증번호를 입력하여 주세요." disabled/>
        

      
      <br/>
      <br/> 
      <Button variant="primary" type="button" className="bt" onClick={()=>{postData({id,passwd,phone,name,passwdCk})}}>
        회원가입
      </Button>
    </form>
  );
}

export default Join;
