import { useLocation } from "react-router-dom";
import {useState, useEffect} from 'react'
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AlterView() {
    const location = useLocation();    
    const navigate = useNavigate();

  
    const [arr,setArr] = useState([]);
    const [body, setBody] = useState();

    useEffect(()=>{
        setArr(location.state.arr)
    })
    
    function updateView(props){
        console.log(props,body)
         axios({
             method: "put",
             url: "http://localhost:8080/board/view/",
             data : {
                 body : body,
                 _id : props
             },
           }).then(() => {
                 console.log('수정 성공');
           });
    }

return(
    <div className="AlterBoardView">
        <h2>게시판 &gt; 게시글 수정</h2>
      {arr.map((a, i) => {
        return (
            <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>글 번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>view</th>
              </tr>
              <tr key={i}>
                <td key={i + 1}>{arr[i]._id}</td>
                <td key={i + 2}>{arr[i].title}</td>
                <td key={i + 3}>{arr[i].uid}</td>
                <td key={i + 4}>{arr[i].date}</td>
                <td key={i + 5}>{arr[i].view}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}><textarea id="AVAria" defaultValue={arr[i].body} onChange={(e)=>{setBody(e.target.value)}}></textarea></td>
              </tr>
            </tbody>
          </Table>
           <Button
           variant="primary" onClick={() => {updateView(arr[i]._id)}}> 글 수정
         </Button>
         </>
        );
      })}

     
    </div>
)
}

export default AlterView