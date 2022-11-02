/* eslint-disable */
import axios from "axios";
import Button from "react-bootstrap/Button";
import {useState} from 'react';
import styles from '../../style/Join.module.css'

function Join() {
  const [id , setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const [passwdCk, setPasswdCk] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [ch, setCh] = useState(true);  
  const [인증번호, 인증번호설정] = useState();
  const [난수, 난수설정] = useState();
  const [ch2, setCh2] = useState(true);
  const [idCk, setIdCk] = useState(0);
  let rand = 0;

  function postData(props){
    console.log(idCk)
    if((props.passwd === props.passwdCk) && props.id !== '' && props.passwd !== '' && idCk === 0){
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
    }else if((props.passwd !== props.passwdCk)){
      alert('비밀번호가 틀립니다.');
    }
    else{
      alert('입력해 주세요');
    }
    console.log(props.id)
    
  }

function openSms(phone){  
  rand = Math.floor(100000 + Math.random() * 900000);
  
  console.log(rand)
  axios({
    method : 'post',
    url : 'http://localhost:8080/sms',
    data : {
      phone : phone,
      rand : rand,
    },
  }).then((data)=>{console.log('됐나?',data); setCh(false); 난수설정(rand)})  
  // axios.post('http://localhost:8080/sms').then(()=>{console.log('됐냐?')})
  // .catch(()=>{console.log('실패?')})
}
  function numberCheck(){
    if(인증번호 == 난수){
      alert('인증 완료 되었습니다.');
      setCh2(false)
    }
    else {
      alert('인증번호가 틀렸습니다.');
    }
  }

  function idCheck(id){
    console.log(id)
    axios({
      method : 'get',
      url: 'http://localhost:8080/member/'+id              
      
  }).then((data)=>{console.log(data.data);if(data.data === 1){setIdCk(1); alert('이미 존재하는 아이디 입니다.')} else{setIdCk(0); alert('사용 가능한 아이디 입니다.')}}).catch(()=>{console.log('실패?')})
  }
  return (  
    <form className="joinForm">
        <p>아이디</p>
        <input type="text" placeholder="아이디를 입력하여 주세요." onChange={(e)=>{setId(e.target.value)}} className={styles.inputBoxButton}/>&nbsp;
        <Button onClick={()=>{idCheck(id)}}>중복확인</Button>

        <p>비밀번호</p>
        <input type="password" placeholder="비밀번호를 입력하여 주세요." onChange={(e)=>{setPasswd(e.target.value)}} className={styles.inputBox}/>

        <p>비밀번호 재확인</p>
        <input type="password" placeholder="비밀번호를 입력하여 주세요."onChange={(e)=>{setPasswdCk(e.target.value)}} className={styles.inputBox}/>
        
        <p>이름</p>
        <input type="text" placeholder="이름을 입력하여 주세요."onChange={(e)=>{setName(e.target.value)}} className={styles.inputBox}/>

        {/* <p>주소</p>
        <input type="text" placeholder="아이디를 입력하여 주세요."/> */}

        <p>전화번호</p>
        <input type="number" placeholder="특수문자를 제외한 번호를 입력해 주세요."onChange={(e)=>{setPhone(e.target.value)}} className={styles.inputBoxButton}/> &nbsp;
        
        <Button variant="primary" className="bt" type="button" onClick={()=>{openSms(phone)}} >
           확인
        </Button>
        <br/>
        <br/>
        <input type="text" placeholder="인증번호를 입력하여 주세요." disabled={ch} onChange={(e)=>{인증번호설정(e.target.value);console.log(e.target.value,난수)}} className={styles.inputBoxButton}/>&nbsp;       
        <Button onClick={()=>{numberCheck()}}>인증</Button>
      
      <br/>
      <br/> 
      <Button variant="primary" type="button" className="bt" disabled={ch2} onClick={()=>{postData({id,passwd,phone,name,passwdCk})}}>
        회원가입
      </Button>
    </form>
  );
}

export default Join;
