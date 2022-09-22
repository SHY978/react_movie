import axios from "axios";
import {Table,Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";

function List() {
  let [arr, setArr] = useState([]);
  
    useEffect(()=>{
        axios({
            method: "get",
            url: "http://localhost:8080/board/list",
          }).then((data) => {            
              setArr(data.data)
          });
    },[])
       
    let navigate = useNavigate();
        
           
    
    
        
 return(
    <div className="boardList">
    <h2>게시판</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
            <th>글 번호</th>
            <th id="title">제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>view</th>
        </tr>
      </thead>
      <tbody>
      {
            arr.map((a,i)=>{
                return(
                    <tr key={[i]}>
                    <td key={[i+1]}>{arr[i]._id}</td>
                    <td key={[i+2]}>{arr[i].title}</td>
                    <td key={[i+3]}>{arr[i].uid}</td>
                    <td key={[i+4]}>{arr[i].date}</td>
                    <td key={[i+5]}>{arr[i].view}</td>
                  </tr>
                )
            })
        }        
      </tbody>
    </Table>      
    <Button variant="primary" onClick={()=>{navigate('/board/1')}}>글 쓰기</Button>
    </div>
 )
}

export default List;
