import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Write() {
  let selector = useSelector((state) => {
    return state.user;
  });
  let date = new Date();
  let sDate = (`${date.getFullYear()}년${date.getMonth()+1}월${date.getDate()}일${date.getHours()}시${date.getMinutes()}분`)
  let [title,setTitle] = useState();
  let [body, setBody] = useState();
  let navigate = useNavigate();
  function addBoard(){
    axios({
        method: "post",
        url: "http://localhost:8080/board/1",
        data :{
            id : selector.uid,
            title : title,
            body : body,
            date : sDate,
        }
      }).then(() => {     
          console.log('전송완료');
          navigate('/board')
      });
  }
  return (
    <div className="BoardWrite">
      <h2>게시판 &gt; 글쓰기</h2>
      <br />
      <Table striped bordered hover>     
      <thead>   
        <tr>
          <th>아이디</th>
          <td>{selector.uid}</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>제목</th>
          <td>
            <input type="text" className="iBox" onChange={(e)=>{setTitle(e.target.value)}}/>
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
            <textarea className="iBox" id="iArea" onChange={(e)=>{setBody(e.target.value)}}></textarea>
          </td>
        </tr>   
        </tbody>  
      </Table>
      <Button variant="primary" onClick={()=>(addBoard())}>글 쓰기</Button>
    </div>
  );
}

export default Write;
