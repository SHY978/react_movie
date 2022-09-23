import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function View() {
  const location = useLocation();
  let [arr, setArr] = useState([]);
  let copy = [];
  let navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/board/view/" + location.state.id,
    }).then((data) => {
           copy.push(data.data)
           setArr(copy)
    });
  }, []);

  return (
    <div className="boardView">
        <h2>게시판 &gt; 게시글</h2>
      {arr.map((a, i) => {
        return (
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
                <td colSpan={5} id="ViewBody">{arr[i].body}</td>
              </tr>
            </tbody>
          </Table>
        );
      })}

      <Button
        variant="primary" onClick={() => {navigate("/board/3",{state: {arr}})}}>
        글 수정
      </Button>
    </div>
  );
}

export default View;
