import Button from "react-bootstrap/Button";

function Join() {
  return (
    <form className="joinForm">
        <p>아이디</p>
        <input type="text" placeholder="아이디를 입력하여 주세요."/>

        <p>비밀번호</p>
        <input type="password" placeholder="비밀번호를 입력하여 주세요."/>

        <p>비밀번호 재 확인</p>
        <input type="password" placeholder="비밀번호를 입력하여 주세요."/>

        <p>이름</p>
        <input type="text" placeholder="이름을 입력하여 주세요."/>

        <p>주소</p>
        <input type="text" placeholder="아이디를 입력하여 주세요."/>

        <p>전화번호</p>
        <input type="number" placeholder="특수문자를 제외한 번호를 입력해 주세요."/> &nbsp;
        
        <Button variant="primary" className="bt" type="button">
            인증
        </Button>
        <br/>
        <br/>
        <input type="text" placeholder="인증번호를 입력하여 주세요." disabled/>
        

       
      <br/>
      <br/> 
      <Button variant="primary" type="submit" className="bt">
        Submit
      </Button>
    </form>
  );
}
export default Join;
