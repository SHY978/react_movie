import {useLocation } from 'react-router-dom';


function Ticketing(){
    let arr=[];
    const location = useLocation();
    const date = new Date();
    

    for(let i=65;i<=70;i++){

       arr.push(<b>{String.fromCharCode(i)}</b>) 
       for(let j=1;j<=10;j++){
        arr.push(<div className={'seat'}><button value={`${i}${j}`} style={{ backgroundColor:'white'}} 
        onClick={(e)=>{if(e.target.style.backgroundColor==='white'){e.target.style.backgroundColor='gray'}
        else{e.target.style.backgroundColor='white'}
        }}>{j}</button></div>)
       }
       arr.push(<><br/><br/></>)
       
    }
    return(
        <>
        <div className="ticketingTop">
           <img src={location.state.image} alt='' /> &nbsp; &nbsp;
           <b>타이틀 : {location.state.movieNm}</b>&nbsp; &nbsp;
           <span>{date.getFullYear()}년&nbsp;{date.getMonth()+1}월&nbsp;{date.getDate()}일&nbsp;{date.getHours()}시&nbsp;{date.getMinutes()}분&nbsp;</span>
        </div>
        <div className='screen'>screen</div>
        {arr}
        </>
    );
}

export default Ticketing