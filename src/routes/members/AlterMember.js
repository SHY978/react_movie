import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

function AlterMember() {
  let navigate = useNavigate();
  let [id, setId] = useState("");
  let [passwd, setPasswd] = useState("");
  let [phone, setPhone] = useState("");
  let [name, setName] = useState("");  
  
  let [passwd2, setPasswd2] = useState("");
  let [phone2, setPhone2] = useState("");
  let [name2, setName2] = useState("");
  axios({
    method: "post",
    url: "http://localhost:8080/session",
    withCredentials: true, //node와 쿠키(세션) 공유
  }).then((data) => {
    console.log(data.data);
    setId(data.data.uid);
    setPasswd(data.data.passwd);
    setName(data.data.name);
    setPhone(data.data.phone);
  });
  return (
    <div className="AlterMember">
      <from>
        <fieldset>
          <legend>회원 정보</legend>
          <input type="text" value={id} disabled />
          <br />
          <input type="text" value={name} disabled />
          <br />
          <input type="text" value={phone} disabled />
          <br />
        </fieldset>

        <fieldset>
          <legend>수정</legend>
          <input type="text" placeholder="이름" onChange={(e)=>{setName2(e.target.value)}}/>
          <br />
          <input type="text" placeholder="전화번호"onChange={(e)=>{setPhone2(e.target.value)}} />
          <br />
          <input type="password" placeholder="비밀번호" onChange={(e)=>{setPasswd2(e.target.value)}}/>
          <br />
          <button onClick={()=>{putMember()}}>수정</button>
        </fieldset>
      </from>
    </div>
  );

  function putMember(){
    axios({
        method : 'put',
        url : 'http://localhost:8080/member',
        data :{ id : id,
                passwd : passwd2,
                name : name2,
                phone : phone2},
    }).then(navigate('/members/4'))
  }
}

export default AlterMember;
