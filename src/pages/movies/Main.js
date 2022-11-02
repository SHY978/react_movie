import {Carousel} from 'react-bootstrap';
import axios from "axios";
import React, { useEffect, useState, memo } from "react";
import {useNavigate} from 'react-router-dom';

function Main(){
    let dailyBoxOfficeList = [];
    let [useDailyBoxOfficeList,setDailyBoxOfficeList] = useState([]);
    let [naverMovieApi,setNMA]= useState([]);
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() - 1; 
    let naverMApi =[];
    const navigate = useNavigate();  
  
    useEffect(() => {    
      async function movie() {
        await axios
          .get(
            "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=" +
              String(year) +
              String(month) +
              String(day)
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
            .get("/v1/search/movie.json", {
              params: {
                query: dailyBoxOfficeList[i].movieNm,
                display: 10,
              },
              headers: {
                "X-Naver-Client-Id": "gQ449ngBZdUeGiIekrD3",
                "X-Naver-Client-Secret": "ZTbrpHlZPo",
              },
            })
            .then((result) => {            
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
    },[]);  
    return(
        <>
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
        </>
    )
}

export default Main