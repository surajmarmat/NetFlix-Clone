import React, { useState, useEffect, useRef } from 'react'
import "./style.css"
import Slider2 from './Slider2'
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

let slider2arr = []
let slider3arr = [[null]]
let no = localStorage.getItem('count');
const Api_key = "&api_key=4b8b44335fab1eaae7d2420f264758e0";
const Base = "https://api.themoviedb.org/3";
const baseImgAdd = "https://image.tmdb.org/t/p/w500";
let imgPath;
let backDropImage;

localStorage.setItem("clickCheck", "no");

function getMovies(url, unique) {
    fetch(url).then(res => res.json()).then(data => {
        for (let i = 0; i < data.results.length; i++) {
            imgPath = baseImgAdd + data.results[i].poster_path;
            localStorage.setItem("path" + unique + i, imgPath);
            localStorage.setItem("movieTitle" + unique + i, data.results[i].title);
        }
        if (unique == 5) {
            if (no == data.results.length - 1 || no > data.results.length - 1) {
                localStorage.setItem('count', 0)
            }
            backDropImage = "https://image.tmdb.org/t/p/original" + data.results[no].backdrop_path;
            localStorage.setItem('backDropPath', backDropImage)
            var titleMovie = data.results[no].title;
            localStorage.setItem('backDropTitle', titleMovie)
            var overView = data.results[no].overview;
            localStorage.setItem('overview', overView)
            if (no < data.results.length - 1) {
                localStorage.setItem('count', ++no)
            }
        }
    })
}

let titleMain = localStorage.getItem('backDropTitle')
let overview = localStorage.getItem('overview')
let BGpath = localStorage.getItem('backDropPath');

const opts = {
    height: "490",
    width: "100%",
    playerVars: {
        autoplay: 1,
    },
}

for (let i = 0; i <= 10; i++) {
    for (let j = 0; j < 19; j++) {
        slider2arr.push(<Slider2 janvi={localStorage.getItem("path" + i + j)} nameMovie={localStorage.getItem("movieTitle" + i + j)} />);
    }
    slider3arr.push(slider2arr);
    slider2arr = [null];
}
let API_URL = Base + "/discover/movie?sort_by=popularity.desc" + Api_key;
getMovies(API_URL, 0);
API_URL = Base + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + Api_key;
getMovies(API_URL, 1);
API_URL = Base + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + Api_key;
getMovies(API_URL, 2);
API_URL = Base + "/discover/movie?with_genres=18&primary_release_year=2019" + Api_key;
getMovies(API_URL, 3);
API_URL = Base + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + Api_key;
getMovies(API_URL, 4);
API_URL = Base + "/discover/movie?certification_country=US&certification.lte=G&sort_by=revenue.desc" + Api_key;
getMovies(API_URL, 5);
API_URL = Base + "/discover/movie?primary_release_date.gte=2020-01-01&primary_release_date.lte=2020-12-01" + Api_key;
getMovies(API_URL, 6);
API_URL = Base + "/discover/movie?with_genres=18&primary_release_year=2018" + Api_key;
getMovies(API_URL, 7);
API_URL = Base + "/discover/movie?with_genres=18&primary_release_year=2017" + Api_key;
getMovies(API_URL, 8);
API_URL = Base + "/discover/movie?with_genres=18&primary_release_year=2016" + Api_key;
getMovies(API_URL, 9);
API_URL = Base + "/discover/movie?with_genres=18&primary_release_year=2015" + Api_key;
getMovies(API_URL, 10);

const Body = () => {

    let noneDP = "none"
    const [movieTrailerUrl, MTU] = useState(" ");
    const [bgColor, bgColorChange] = useState(" ");
    const [display1, newDisplay] = useState(noneDP);

    function triggerTrailer() {
        movieTrailer(titleMain).then((url) => {
            newDisplay("block");
            for (let i = 0; i < url.length; i++) {
                if (url[i] == "=") {
                    MTU(url.slice(i + 1, url.length));
                }
            }
        })
    }

setInterval(() => {
    if (localStorage.getItem("clickCheck") == "yes") {
        newDisplay("block")
        MTU(localStorage.getItem("currentMovieUrl"));
    }
}, 2000);

    function cancel() {
        newDisplay("none");
        MTU(" ");
        localStorage.setItem("currentMovieUrl", " ");
        localStorage.setItem("clickCheck", "no");
    }

    return (
        <div className='mainBody' onScroll={(event)=>{
            // console.log(event.scroll);
            if( event.target.scrollTop > 400 ){
                console.log("NetFlix Scrolled")
                console.log(event.target.scrollTop)
                bgColorChange('#111')
            }
            else if(event.target.scrollTop < 400){
                bgColorChange(" ");
            }
        }}>
            <div className="mainBodyContent">
                <div className="slider">
                    <div className="seriesDet"
                        style={{ backgroundImage: `url(${BGpath})` }}
                    >
                        <h3 className="blurryHeader" style={{background:bgColor }} >
                            Netflix.
                        </h3>
                        <div className="flexDown">
                            <h2>
                                {titleMain}
                            </h2>
                            <div className="minorDetails">
                                <p>
                                    {overview}
                                </p>
                            </div>
                        </div>
                        <div className="watchNow" >
                            <button onClick={triggerTrailer} >
                                Watch Now
                            </button>
                        </div>
                    </div>
                    <div className="empty" style={{ background: "linear-gradient(to top, #111, rgba(17, 17, 17, 0.660), transparent)" }} ></div>
                    <div className="youTuber" style={{ display: display1 }}>
                        <button onClick={cancel} >
                            X
                        </button>
                        <YouTube videoId={movieTrailerUrl} opts={opts} />
                    </div>
                </div>
                <div className="secondBox">
                    <h5 id='h5ch' style={{ background: "linear-gradient(to right, rgba(228, 43, 43, 0.1), rgba(228, 43, 43, 0))" }} >
                        Trending Movies
                    </h5>
                    <div className="slider3"  >
                        {slider3arr[1]}
                    </div>
                    <h5 style={{ background: "linear-gradient(to right, rgba(228, 43, 43, 0.1), rgba(228, 43, 43, 0))" }} >
                        Viewer's Choice
                    </h5>
                    <div className="slider4"  >
                        {slider3arr[2]}
                    </div>
                    <h5 style={{ background: "linear-gradient(to right, rgba(228, 43, 43, 0.1), rgba(228, 43, 43, 0))" }} >
                        Top Kids Movies
                    </h5>
                    <div className="slider5"  >
                        {slider3arr[3]}
                    </div>
                    <h5 style={{ background: "linear-gradient(to right, rgba(228, 43, 43, 0.1), rgba(228, 43, 43, 0))" }} >
                        Comedy Movies
                    </h5>
                    <div className="slider5"  >
                        {slider3arr[5]}
                    </div>
                    <h5 style={{ background: "linear-gradient(to right, rgba(228, 43, 43, 0.1), rgba(228, 43, 43, 0))" }} >
                        Top Animation Movies
                    </h5>
                    <div className="slider5"  >
                        {slider3arr[6]}
                    </div>
                    <h5 style={{ background: "linear-gradient(to right, rgba(228, 43, 43, 0.1), rgba(228, 43, 43, 0))" }} >
                        By release year (2020)
                    </h5>
                    <div className="slider5"  >
                        {slider3arr[7]}
                    </div>
                    <h5 style={{ background: "linear-gradient(to right, rgba(228, 43, 43, 0.1), rgba(228, 43, 43, 0))" }} >
                        By release year (2019)
                    </h5>
                    <div className="slider5"  >
                        {slider3arr[4]}
                    </div>
                    <h5 style={{ background: "linear-gradient(to right, rgba(228, 43, 43, 0.1), rgba(228, 43, 43, 0))" }} >
                        By release year (2018)
                    </h5>
                    <div className="slider5"  >
                        {slider3arr[8]}
                    </div>
                    <h5 style={{ background: "linear-gradient(to right, rgba(228, 43, 43, 0.1), rgba(228, 43, 43, 0))" }} >
                        By release year (2017)
                    </h5>
                    <div className="slider5"  >
                        {slider3arr[9]}
                    </div>
                    <h5 style={{ background: "linear-gradient(to right, rgba(228, 43, 43, 0.1), rgba(228, 43, 43, 0))" }} >
                        By release year (2016)
                    </h5>
                    <div className="slider5"  >
                        {slider3arr[10]}
                    </div>
                    <h5 style={{ background: "linear-gradient(to right, rgba(228, 43, 43, 0.1), rgba(228, 43, 43, 0))" }} >
                        By release year (2015)
                    </h5>
                    <div className="slider5"  >
                        {slider3arr[11]}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body
