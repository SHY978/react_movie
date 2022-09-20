import {Nav,Navbar,Container } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
function AlignmentExample() {
  let navigate = useNavigate();
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=>{navigate('/')}}>Movie</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            
            
          </Nav>
          <Nav>
                <Nav.Link onClick={()=>{navigate('/members/2')}} >로그인</Nav.Link>            
                <Nav.Link onClick={()=>{navigate('/members/1')}} >회원가입</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AlignmentExample;