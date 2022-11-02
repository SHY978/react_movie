/* eslint-disable */
import {useLocation } from 'react-router-dom';
import {useState} from 'react';


function Ticketing(){
    let arr=[];
    let [number, setNumber] =useState(0);
    let [clickSeat, setSeat] = useState('');    
    const location = useLocation();
    const date = new Date();    
    const hours = 16;
    const minutes = 20;    
    let copy = 0;
    let copy2 = [];
    const [count, setCount] = useState(0);

    for(let i=65;i<=70;i++){
       arr.push(<b>{String.fromCharCode(i)}</b>) 
       for(let j=1;j<=10;j++){
        arr.push(<div className={'seat'}><button value={`${String.fromCharCode(i)}${j}`} style={{ backgroundColor:'white'}} 
        onClick={(e)=>{if(count === 0 || e.target.style.backgroundColor==='gray'){if(e.target.style.backgroundColor==='white'){e.target.style.backgroundColor='gray';setSeat(e.target.value);setCount(1)}
        else{e.target.style.backgroundColor='white'; setSeat(''); setCount(0)}
        }else {alert('한 좌석만 선택 해 주세요')}}}>{j}</button></div>)
       }
       arr.push(<><br/><br/></>)
       
    }
    return(
        <>
        <div className="ticketingTop">
           <img src={location.state.image} alt='' /> &nbsp; &nbsp;
           <b>타이틀 : {location.state.movieNm}</b>&nbsp; &nbsp;
           <span>{date.getFullYear()}년&nbsp;{date.getMonth()+1}월&nbsp;{date.getDate()}일&nbsp;{hours}시&nbsp;{minutes}분&nbsp;</span><b>{clickSeat}</b>
           <br/>
           {/* <div>
                <button onClick={()=>{if(number-1 >= 0){copy = number-1;setNumber(copy)}}}>-1</button><input type="number" value={number}></input><button onClick={()=>{if(number+1 < 5){copy = number+1;setNumber(copy)}}}>+1</button>
           </div> */}
           
        </div>
        <div className='screen'>screen</div>
        {arr}
        </>
    );
}

export default Ticketing