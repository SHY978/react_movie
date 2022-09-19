

function Login(){
    return(      
        <div className="login_form">
            <p>아이디</p>
            <input type="text" placeholder="아이디를 입력 해 주세요"/><br/>
            <p>비밀번호</p>
            <input type="password" placeholder="비밀번호를 입력 해 주세요"/>
            <br/>
            <input type="button" value={'로그인'}/>
        </div>         
    );
}
export default Login