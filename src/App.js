/* eslint-disable */
import axios from "axios";
import "./App.css";
import {Carousel} from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AlignmentExample from "./component/Navbar.js";
import {Routes, Route, useNavigate } from 'react-router-dom';
import Ticketing from "./pages/movies/Ticketing.js";
import Login from './pages/members/Login.js';
import Join from './pages/members/Join.js';
import Logout from './pages/members/Logout.js'
import Mypage from './pages/members/Mypage.js'
import AlterMember from './pages/members/AlterMember.js';
import List from './pages/board/List.js';
import Write from './pages/board/Write.js';
import View from './pages/board/View.js';
import AlterView from './pages/board/AlterView.js';
import Main from './pages/movies/Main.js'
import { useDispatch, useSelector } from 'react-redux';
import { changeUid } from './store.js'

function App() {  
  let dailyBoxOfficeList = [];
  let [useDailyBoxOfficeList,setDailyBoxOfficeList] = useState([]);
  let [naverMovieApi,setNMA]= useState([]);
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() - 1; 
  let naverMApi =[];
  const navigate = useNavigate();  
  let selector = useSelector((state)=>{return state.user});
  let dispatch = useDispatch();
 
  useEffect(() => {    
    async function movie() {
      await axios
        .get(
          "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=" + '20221019'
            // String(year) +
            // String(month) +
            // String(day)
        )
        .then((data) => {
          console.log(data);
          for (
            let i = 0;
            i < data.data.boxOfficeResult.dailyBoxOfficeList.length;
            i++
          ) {
            dailyBoxOfficeList[i] =
              data.data.boxOfficeResult.dailyBoxOfficeList[i];
          }
        })
        .catch(() => {
          console.log("실패1");
        });
      for (let i = 0; i < dailyBoxOfficeList.length; i++) {
        await axios
          .get("/v1/search/movie.json", {       //재개봉작 같은 경우 순서가 밀려있어서 포스터 잘못 나옴 고친다면 api 하나 더 사용하여 감독 비교를 하면 될 듯 검색 시간이 더 증가 하겠지만..
            params: {
              query: dailyBoxOfficeList[i].movieNm,
              display: 1,
            },
            headers: {
              "X-Naver-Client-Id": "gQ449ngBZdUeGiIekrD3",
              "X-Naver-Client-Secret": "ZTbrpHlZPo",
            },
          })
          .then((result) => {     
            console.log(result.data)       
            console.log(dailyBoxOfficeList[i].movieNm);
            console.log(result.data.items[0].image);
            console.log(result.data.items[0].userRating	);     
            console.log(result.data.items[0].link	);          
            naverMApi[i] = result.data.items[0]             
          })
          .catch(() => {
            console.log("실패2");
          });
      }    
      setDailyBoxOfficeList(dailyBoxOfficeList);
      setNMA(naverMApi);
    }
    movie();    

    axios({      
      method:'post', 
      url: 'http://localhost:8080/session',     
      withCredentials : true,//node와 쿠키(세션) 공유                
  }).then((data)=>{            
      if(data.data.uid){
        dispatch(changeUid(data.data.uid))
      }else if(!data.data.uid){
        dispatch(changeUid('empty'))
      }  
  })      
  },[]);  
  return (
    <div className="App">
      <AlignmentExample></AlignmentExample>
      <Routes>
        <Route path='/' element={<>
          <div className="topMovie">
          <div className="topBox">
          <Carousel fade>          
              {useDailyBoxOfficeList.map((x, i) => {
                return (
                  <Carousel.Item key={i}>
                    <a href={naverMovieApi[i].link} target="_blank" rel="noopener noreferrer">
                      <img
                        className="d-block w-100"
                        src={String(
                          String(naverMovieApi[i].image).substr(0, 40) +
                            "500" +
                            String(naverMovieApi[i].image).substr(43)
                        )}
                        alt="slide"
                      />
                    </a>
                  </Carousel.Item>
                );
              })}          
          </Carousel>
          </div>
        </div>
        <div className="container" id="mainContainer">
          <div className="row row-cols-3">
            {useDailyBoxOfficeList.map((x, i) => {
              return (
                <div className="col" key={i}>
                  <h1>{i + 1}</h1>
                  
                  <img src={naverMovieApi[i].image} onClick={()=>{navigate(`/movie/${useDailyBoxOfficeList[i].movieCd}/Ticketing`, {state:{image:naverMovieApi[i].image, movieNm:useDailyBoxOfficeList[i].movieNm}})}} alt=""/>
                  
                  <h4>
                    {useDailyBoxOfficeList[i].movieNm} | ({naverMovieApi[i].userRating}/10)
                  </h4>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
        </>}/>
        <Route path="/movie/:id/Ticketing" element={<Ticketing/>} />         
        <Route path="/members/1" element={<Join/>} /> 
        <Route path="/members/2" element={<Login/>} />   
        <Route path="/members/3" element={<AlterMember/>}/>
        <Route path="/members/4" element={<Logout/>} />   
        <Route path="/members/mypage" element={<Mypage/>}/>
        <Route path="/board/" element={<List/>}/>
        <Route path="/board/1" element={<Write/>}/>
        <Route path="/board/view/:id" element={<View/>} />
        <Route path="/board/3" element={<AlterView/>}/>
        <Route path="*" element={<div>잘못된 경로 입니다.</div>} />        
      </Routes>
    
    </div>
  );
}

export default App;